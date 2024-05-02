import { fabric } from "fabric";
import { BaseElcNode } from "./BaseElcNode";
import { ElcPathPoint } from "./ElcPathPoint";
import { constant } from "../../../constant";

export class ElcPath extends BaseElcNode {
  constructor(elcCanvas, options = {}) {
    super();
    this.init(elcCanvas, options);
  }

  init(elcCanvas, options) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = elcCanvas.fCanvas;
    this.options = {
      layer: constant.Layer.PATH,
      ...options,
    };
    this.defaultParameterProcessing(options);
    this.elcPathPointMap = new Map();
    this.points = this.options.points || [];

    this.createPoints();
    this.createPath();
  }

  createPoints() {
    this.points.forEach((point) => {
      const elcPathPoint = new ElcPathPoint(this.elcCanvas, {
        scaleY: 0.4,
        scaleX: 0.4,
        ...point,
      });
      this.elcPathPointMap.set(elcPathPoint.id, elcPathPoint);
    });
  }

  createPath() {
    const pathPoints = this.points.map((point) => {
      // const position = point.fNode.getCenterPoint();
      const position = point;
      return [position.x, position.y];
    });

    let pathString = "M ";
    pathPoints.forEach((point, index) => {
      if (index > 0) {
        pathString += " L ";
      }
      pathString += `${point[0]} ${point[1]}`;
    });
    this.fNode = new fabric.Path(pathString, {
      fill: "transparent",
      stroke: this.options.stroke || "red", // 默认描边颜色为黑色，除非已指定
      strokeWidth: this.options.strokeWidth || 2, // 默认描边宽度为1，除非已指定
      ...this.options,
    });
    // this.fCanvas.add(this.fNode);
    this.create();
  }

  // 这里可以添加其他方法，比如更新路径、添加或移除点等
}
