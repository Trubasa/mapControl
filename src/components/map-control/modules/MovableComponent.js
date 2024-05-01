import { BaseComponent } from "./BaseComponent";

export class MovableComponent extends BaseComponent {
  constructor(fCanvas, options) {
    super();
    this.init(fCanvas, options);
  }

  onMouseDown(opt) {
    if (!this.enable) return;
    if (this.options && this.options.extraEnableFunc) {
      if (!this.options.extraEnableFunc()) {
        return;
      }
    }

    this.isDragging = true;
    this.lastPosX = opt.e.clientX;
    this.lastPosY = opt.e.clientY;
  }

  onMouseMove(opt) {
    if (!this.enable || !this.isDragging) return;

    const e = opt.e;
    const vpt = this.fCanvas.viewportTransform;

    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;

    this.fCanvas.requestRenderAll();

    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }

  onMouseUp(opt) {
    this.isDragging = false;
  }

  init(elcCanvas, options) {
    this.elcCanvas = elcCanvas;
    this.options = options;
    this.fCanvas = this.elcCanvas.fCanvas;
    this.isDragging = false;
    this.lastPosX = 0;
    this.lastPosY = 0;

    // 绑定事件处理器
    this.onMouseDownHandle = this.onMouseDown.bind(this);
    this.onMouseMoveHandle = this.onMouseMove.bind(this);
    this.onMouseUpHandle = this.onMouseUp.bind(this);

    // 在fabric画布上添加事件监听
    this.fCanvas.on("mouse:down", this.onMouseDownHandle);
    this.fCanvas.on("mouse:move", this.onMouseMoveHandle);
    this.fCanvas.on("mouse:up", this.onMouseUpHandle);
  }

  destroy() {
    // 从fabric画布上移除事件监听
    this.fCanvas.off("mouse:down", this.onMouseDownHandle);
    this.fCanvas.off("mouse:move", this.onMouseMoveHandle);
    this.fCanvas.off("mouse:up", this.onMouseUpHandle);
  }
}
