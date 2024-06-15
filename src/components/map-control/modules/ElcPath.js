import { fabric } from "fabric";
import { BaseElcNode } from "./BaseElcNode";
import { ElcPathPoint } from "./ElcPathPoint";
import { constant } from "../utils/constant";
import { utils } from "../utils/utils";

export class ElcPath extends BaseElcNode {
  constructor(elcCanvas, options = {}) {
    super();
    this.init(elcCanvas, options);
  }

  init(elcCanvas, options) {
    this.debouncedOnDeselect = utils.debounce(this.onDeselect.bind(this), 10);
    this.debouncedOnSelect = utils.debounce(this.select.bind(this), 10);
    this.elcCanvas = elcCanvas;
    this.fCanvas = elcCanvas.fCanvas;
    this.fGroup = null;
    this.options = {
      layer: constant.Layer.PATH,
      ...options,
    };
    this.defaultParameterProcessing(this.options);
    this.elcPathPointMap = new Map();
    this.points = this.options.points || [];
    this.pathPointImgScaleNum = this.options.pathPointImgScaleNum || 1;

    this.createPoints();
    this.createPath();

    this.createGroup();

    utils
      .waitForCondition(() => {
        return !!this.fGroup;
      }, "等待fGroup就绪超时")
      .then(() => {
        this.fNode = this.fGroup;
        this.create();
      });
  }

  /** 将该组件涉及的所有fabric object 合并成一个group 方便编辑 */
  createGroup() {
    utils
      .waitForCondition(() => {
        // 所有的fabric节点是否都加载完毕了，因为有一些是异步加载的图片啥的，没法在初始创建的时候立即就绪
        const flag = this.elcPathPointMap.values().every((elcPathPoint) => {
          return elcPathPoint.isFNodesReady(); // 获取这个elc实例相关的fabric对象
        });
        return flag;
      }, "等待节点就绪超时")
      .then(() => {
        let fNodes = [];
        this.elcPathPointMap.values().forEach((elcPathPoint) => {
          fNodes = fNodes.concat(elcPathPoint.getAllFNodes());
        });
        fNodes.push(this.fPath);

        this.removefNodesFromCanvas(this.fCanvas, fNodes);
        this.fGroup = new fabric.Group(fNodes, {
          // this.fGroup = new fabric.Group([], {
          ...this.options,
        });
      });
  }

  removefNodesFromCanvas(fCanvas, fNodes) {
    fNodes.forEach((ele) => {
      fCanvas.remove(ele);
    });
  }

  createPoints() {
    this.points.forEach((point) => {
      const elcPathPoint = new ElcPathPoint(
        this.elcCanvas,
        {
          pathPointImgScaleNum: this.pathPointImgScaleNum,
          ...point,
        },
        {
          deselectFunc: this.debouncedOnDeselect,
        }
      );
      this.elcPathPointMap.set(elcPathPoint.id, elcPathPoint);
    });
  }

  createPath() {
    const pathPoints = this.points.map((point) => {
      const position = point;
      return [position.x, position.y];
    });
    /*  const pathPoints = Array.from(this.elcPathPointMap.values()).map(
       (elcPathPoint) => {
         const position = elcPathPoint.elcImage.getPosition();
         return [position.x, position.y];
       }
     ); */

    let pathString = "M ";
    pathPoints.forEach((point, index) => {
      if (index > 0) {
        pathString += " L ";
      }
      pathString += `${point[0]} ${point[1]}`;
    });
    this.fPath = new fabric.Path(pathString, {
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockRotation: true,
      strokeUniform: true,
      fill: "transparent",
      stroke: this.options.stroke || "red", // 默认描边颜色为黑色，除非已指定
      strokeWidth: this.options.strokeWidth || 2, // 默认描边宽度为1，除非已指定
      ...this.options,
    });
  }

  keepPathPointRotation() {
    const angle = this.fGroup.angle;

    this.elcPathPointMap.values().forEach((elcPathPoint) => {
      elcPathPoint.keepRotation(angle);
    });

    this.elcCanvas.refresh();
  }

  getAllFNodes() {
    return [this.fGroup];
  }

  isFNodesReady() {
    return this.getAllFNodes().every((ele) => !!ele);
  }

  clearPath() {
    this.fCanvas.remove(this.fPath);
  }
  clearGroup() {
    this.fCanvas.remove(this.fGroup);
  }

  onModified(e) {
    // console.log("path modified", e);
    this.keepPathPointRotation();
  }

  onDeselect() {
    // this.updateAndRerender();
  }

  updateAndRerender() {
    this.updatePosition();
    this.destroy();
    this.init(this.elcCanvas, this.options);
  }

  updatePosition() {
    /* this.elcCanvas.clearSelection();
    this.options.points.forEach((ele) => {
      const elcPathPoint = this.elcPathPointMap.get(ele.id);
      if (elcPathPoint) {
        const position = elcPathPoint.elcImage.getPosition();
        ele.x = position.x;
        ele.y = position.y;
      }
    }); */
  }

  select() {
    const nodes = this.getAllFNodes();
    // console.log("nodes", nodes);

    this.fCanvas.setActiveObject(
      new fabric.ActiveSelection(nodes, {
        canvas: this.fCanvas,
      })
    );
    // console.log("path select", this.fCanvas.getActiveObject());
    this.elcCanvas.refresh();
  }

  destroy() {
    this.clearPath();
    this.elcPathPointMap.forEach((ele) => ele.destroy());
    this.clearGroup();
  }
}
