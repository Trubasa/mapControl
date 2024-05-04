import { BaseElcNode } from "./BaseElcNode";
import { fabricUtils } from "./fabricUtils";
export class ElcText extends BaseElcNode {
  constructor(elcCanvas, options = {}, extra = {}) {
    super();
    this.init(elcCanvas, options, extra);
  }
  init(elcCanvas, options, extra) {
    this.elcCanvas = elcCanvas;
    this.extra = extra;
    this.fCanvas = elcCanvas.fCanvas;
    this.options = {
      ...options,
    };
    this.defaultParameterProcessing(options);

    this.loadText();
  }
  destroy() {
    this.unRegisterListener();
    this.fCanvas.remove(this.fNode);
  }

  registerListener() {
    this.onModifiedHandle = this.onModified.bind(this);
    this.fNode.on("modified", this.onModifiedHandle);

    this.onDeselectHandle = this.onDeselect.bind(this);
    this.fNode.on("deselected", this.onDeselectHandle);
  }
  unRegisterListener() {
    if (this.fNode) {
      this.fNode.off("modified", this.onModifiedHandle);
      this.fNode.off("deselected", this.onDeselectHandle);
    }
  }
  onDeselect() {
    if (this.extra && this.extra.deselectFunc) {
      this.extra.deselectFunc();
    }
  }

  onModified(e) {
    if (this.extra && this.extra.modifiedFunc) {
      this.extra.modifiedFunc();
    }
  }

  loadText() {
    const fText = new fabric.Text(this.options.text, {
      left: this.options.x, // 文本的水平位置
      top: this.options.y, // 文本的垂直位置
      fontSize: 20, // 字体大小
      fill: "#ff5722", // 字体颜色
      fontFamily: "Arial", // 字体样式
    });
    this.fNode = fText;
    this.registerListener();

    // 将文本对象添加到画布上
    this.create();
  }
}
