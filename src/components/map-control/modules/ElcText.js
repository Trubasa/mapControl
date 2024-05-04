import { BaseElcNode } from "./BaseElcNode";
import { fabricUtils } from "./fabricUtils";
export class ElcText extends BaseElcNode {
  constructor(elcCanvas, options = {}) {
    super();
    this.init(elcCanvas, options);
  }
  init(elcCanvas, options) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = elcCanvas.fCanvas;
    this.options = {
      ...options,
    };
    this.defaultParameterProcessing(options);

    this.loadText();
  }
  destroy() {
    throw new Error(
      constant.ERROR_TYPE.SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS
    );
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

    // 将文本对象添加到画布上
    this.create();
  }
}
