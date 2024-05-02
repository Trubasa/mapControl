import { BaseComponent } from "./BaseComponent";

export class EditableComponent extends BaseComponent {
  constructor(elcCanvas, options) {
    super();
    this.init(elcCanvas, options);
  }

  get enable() {
    return this._enable;
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
    this.elcCanvas.refresh();
  }

  onMouseDown(e) {
    if (!this.enable) {
      this.clearSelection();
    }
    if (this.options && this.options.extraEnableFunc) {
      if (!this.options.extraEnableFunc()) {
        this.clearSelection();
      }
    }
  }

  clearSelection() {
    this.fCanvas.discardActiveObject();
    this.elcCanvas.refresh();
  }

  init(elcCanvas, options) {
    this.elcCanvas = elcCanvas;
    this.options = options;
    this.fCanvas = this.elcCanvas.fCanvas;
    this.onAddObjectHandle = this.onAddObject.bind(this);
    this.onMouseDownHandle = this.onMouseDown.bind(this);
    this.fCanvas.on("object:added", this.onAddObjectHandle);
    this.fCanvas.on("mouse:down", this.onMouseDownHandle);
  }
  destroy() {
    this.fCanvas.off("object:added", this.onAddObjectHandle);
    this.fCanvas.off("mouse:down", this.onMouseDownHandle);
  }

  onAddObject(e) {
    const object = e.target;
    object.set({
      selectable: this.enable,
    });
  }
}
