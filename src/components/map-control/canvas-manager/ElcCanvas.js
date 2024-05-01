import { canvasUtils } from "./canvasUtils";
import { MouseZoomComponent } from "./mouseZoomComponent";

export class ElcCanvas {
  constructor(canvasDom) {
    this.mouseZoomComponent = new MouseZoomComponent();
    this.init(canvasDom);
  }

  reset() {
    if (this.fCanvas) this.fCanvas.clear();
  }

  init(canvasDom) {
    this.fCanvas = new fabric.Canvas(canvasDom);

    this.mouseZoomComponent.init(this.fCanvas);
  }
  destroy() {
    this.mouseZoomComponent.destroy();

    this.fCanvas.dispose();
  }
}
