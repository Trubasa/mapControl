import { BaseComponent } from "./BaseComponent";

export class MouseZoomComponent extends BaseComponent {
  constructor(fCanvas) {
    super();
    this.init(fCanvas);
  }

  onMouseWheel(opt) {
    if (!this.enable) return;

    const event = opt.e;
    const delta = event.deltaY;
    const zoomStep = 0.1;
    let zoom = this.fCanvas.getZoom();

    zoom = delta < 0 ? zoom * (1 + zoomStep) : zoom / (1 + zoomStep);
    zoom = Math.max(0.1, Math.min(20, zoom));

    const pointer = this.fCanvas.getPointer(event, true);
    const mousePos = new fabric.Point(pointer.x, pointer.y);

    this.fCanvas.zoomToPoint(mousePos, zoom);

    event.preventDefault();
    event.stopPropagation();
  }
  init(elcCanvas) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = this.elcCanvas.fCanvas;
    this.onMouseWheelHandle = this.onMouseWheel.bind(this);
    this.fCanvas.on("mouse:wheel", this.onMouseWheelHandle);
  }
  destroy() {
    this.fCanvas.off("mouse:wheel", this.onMouseWheelHandle);
  }
}
