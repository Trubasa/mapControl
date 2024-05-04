import { BaseComponent } from "./BaseComponent";

export class SelectionComponent extends BaseComponent {
  constructor(elcCanvas) {
    super();
    this.init(elcCanvas);
  }

  onSelectionClear(e) {
    // 检查是否为多选分组对象
    this.nofityNodeSelectionClear(e);
  }

  nofityNodeSelectionClear(event) {}

  init(elcCanvas) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = this.elcCanvas.fCanvas;

    // 绑定事件处理器
    this.onSelectionClearHandle = this.onSelectionClear.bind(this);

    // 添加事件监听器到Fabric.js的Canvas实例上
    this.fCanvas.on("selection:cleared", this.onSelectionClearHandle);
    this.fCanvas.on("selection:deselected", this.onSelectionClearHandle);
  }

  destroy() {
    // 从Fabric.js的Canvas实例上移除事件监听器
    this.fCanvas.off("selection:cleared", this.onSelectionClearHandle);
  }
}
