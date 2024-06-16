import { fabric } from "fabric";
import { BaseElcNode } from "./BaseElcNode";
import { utils } from "../utils/utils";
import { constant } from "../utils/constant";
import { ElcImage } from "./ElcImage";
import { fabricUtils } from "./fabricUtils";

export class ElcCar extends BaseElcNode {
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
      layer: constant.Layer.CAR,
      ...options,
    };
    this.defaultParameterProcessing(this.options);

    this.carImageSrc = this.options.carImageSrc;

    // 加载车辆图像
    this.loadCarImage();

    this.createGroup();

    utils
      .waitForCondition(() => {
        return !!this.fGroup;
      }, "等待fGroup就绪超时")
      .then(() => {
        this.fNode = this.fGroup;
        // console.log("this.fNode", this.fNode);
        this.create();
      });
  }

  loadCarImage() {
    this.elcImage = new ElcImage(this.elcCanvas, {
      originX: "center",
      originY: "center",
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      ...this.options,
      keepElementViewSize: true,
    });
  }

  createGroup() {
    utils
      .waitForCondition(() => {
        // 所有的fabric节点是否都加载完毕了，因为有一些是异步加载的图片啥的，没法在初始创建的时候立即就绪
        const flag = this.elcImage.isFNodesReady();
        return flag;
      }, "等待carImage就绪超时")
      .then(() => {
        let fNodes = [...this.elcImage.getAllFNodes()];
        // console.log("fNodes", fNodes);

        fabricUtils.removefNodesFromCanvas(this.fCanvas, fNodes);
        // 如果传入了 groupAttrs，则使用这些属性创建组
        if (this.options.groupAttrs) {
          const groupRect = new fabric.Rect({
            left: this.options.groupAttrs.left || 0,
            top: this.options.groupAttrs.top || 0,
            fill: "transparent", // 背景颜色设为透明
            width: this.options.groupAttrs.width || 0, // 宽度为0
            height: this.options.groupAttrs.height || 0, // 高度为0
          });
          fNodes.push(groupRect);
        }

        this.fGroup = new fabric.Group(fNodes, {
          id: this.options.id,
          layer: this.options.layer,
          neverSelect: this.options.neverSelect,
        });
      });
  }
  updatePosition(x, y) {
    /* const { left: offsetLeft, top: offsetTop, scaleX, scaleY } = this.fNode;
    this.elcImage.fNode.set({
      left: x - offsetLeft * scaleX,
      top: y - offsetTop * scaleY,
    }); */
    var invertedMatrix = fabric.util.invertTransform(
      this.fNode.calcTransformMatrix()
    );

    var transformedPoint = fabric.util.transformPoint(
      new fabric.Point(x, y),
      invertedMatrix
    );

    // 更新点的位置
    this.elcImage.fNode.set({
      left: transformedPoint.x,
      top: transformedPoint.y,
    });
  }
  updateCarRotation(angle) {
    this.elcImage.fNode.set({
      angle: -angle,
    });
  }

  onModified() {}

  getAllFNodes() {
    return [this.fGroup];
  }

  isFNodesReady() {
    return this.getAllFNodes().every((ele) => !!ele);
  }

  onDeselect() {
    // 可以在这里实现取消选择的逻辑
  }

  select() {
    const nodes = this.getAllFNodes();
    this.fCanvas.setActiveObject(
      new fabric.ActiveSelection(nodes, {
        canvas: this.fCanvas,
      })
    );
    this.elcCanvas.refresh();
  }

  destroy() {
    if (this.fGroup) {
      this.fCanvas.remove(this.fGroup);
    }
  }
}
