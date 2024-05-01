import { BaseComponent } from "./BaseComponent";

export class EditableComponent extends BaseComponent {
  constructor(fCanvas) {
    super();
    this.init(fCanvas);
  }

  set enable(value) {
    this._enable = value;
    if (!this.fCanvas) return;
    this.fCanvas.forEachObject((object) => {
      object.set({
        selectable: value,
      });
    });
    // 取消所有对象的选中状态
    this.fCanvas.discardActiveObject();
    // 更新画布显示，确保选中状态的变化被正确渲染
    this.fCanvas.requestRenderAll();
  }

  init(fCanvas) {
    this.fCanvas = fCanvas;
    this.onAddObjectHandle = this.onAddObject.bind(this);
    this.fCanvas.on("object:added", this.onAddObjectHandle);
  }
  destroy() {
    this.fCanvas.off("object:added", this.onAddObjectHandle);
  }

  onAddObject(e) {
    const object = e.target;
    object.set({
      selectable: this.enable,
    });
  }
}
