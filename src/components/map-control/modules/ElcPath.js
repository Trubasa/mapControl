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

    // this.makeGroup();
  }

  /** 将该组件涉及的所有fabric object 合并成一个group 方便编辑 */
  makeGroup() {
    let fNodes = []
    // await utils.sleep(2000)
    this.elcPathPointMap.forEach((elcPathPoint) => {
      /* await utils.waitForCondition(() => {
        return elcPathPoint.relevanceNodes().every((node) => !!node)
      }, "等待elcPathPoint加载完成") */
      let ary = elcPathPoint.relevanceNodes()  // 获取这个elc实例相关的fabric对象
      fNodes = fNodes.concat(ary)
    })
    debugger
    return
    fNodes.push(this.fNode)

    this.fGroup = new fabric.Group(fNodes, {})
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
    /* const pathPoints = this.points.map((point) => {
      const position = point;
      return [position.x, position.y];
    }); */
    const pathPoints = Array.from(this.elcPathPointMap.values()).map(
      (elcPathPoint) => {
        const position = elcPathPoint.elcImage.getPosition();
        return [position.x, position.y];
      }
    );

    let pathString = "M ";
    pathPoints.forEach((point, index) => {
      if (index > 0) {
        pathString += " L ";
      }
      pathString += `${point[0]} ${point[1]}`;
    });
    this.fNode = new fabric.Path(pathString, {
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockRotation: true,
      fill: "transparent",
      stroke: this.options.stroke || "red", // 默认描边颜色为黑色，除非已指定
      strokeWidth: this.options.strokeWidth || 2, // 默认描边宽度为1，除非已指定
      ...this.options,
    });
    this.registerListener();
    // this.fCanvas.add(this.fNode);
    this.create();
  }

  clearPath() {
    this.fCanvas.remove(this.fNode);
  }

  registerListener() {
    this.onModifiedHandle = this.onModified.bind(this);
    this.fNode.on("modified", this.onModifiedHandle);

    this.fNode.on("deselected", this.debouncedOnDeselect);

    this.onSelectHandle = this.select.bind(this);
    this.fNode.on("selected", this.onSelectHandle);
  }
  unRegisterListener() {
    this.fNode.off("modified", this.onModifiedHandle);
    this.fNode.off("deselected", this.debouncedOnDeselect);
    this.fNode.off("selected", this.onSelectHandle);
  }

  onModified(e) { }

  onDeselect() {
    this.updateAndRerender();
  }

  updateAndRerender() {
    // console.log("updateAndRerender");
    this.updatePosition();
    this.destroy();
    this.init(this.elcCanvas, this.options);
  }

  updatePosition() {
    this.elcCanvas.clearSelection();
    this.options.points.forEach((ele) => {
      const elcPathPoint = this.elcPathPointMap.get(ele.id);
      if (elcPathPoint) {
        const position = elcPathPoint.elcImage.getPosition();
        ele.x = position.x;
        ele.y = position.y;
      }
    });
  }

  relevanceNodes() {
    /* let nodes = [this.fNode];
    this.elcPathPointMap.forEach((elcPathPoint) => {
      nodes = nodes.concat(elcPathPoint.relevanceNodes());
    });
    return nodes; */
    return [this.fGroup];
  }

  select() {
    const nodes = this.relevanceNodes();
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
    this.unRegisterListener();
    this.clearPath();
    this.elcPathPointMap.forEach((ele) => ele.destroy());
  }
}
