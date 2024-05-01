import { FImage } from "./ElcImage";
import { fabricUtils } from "./fabricUtils";
import { MouseZoomComponent } from "./mouseZoomComponent";

export class ElcCanvas {
  constructor(canvasDom) {
    this.init(canvasDom);
  }

  reset() {
    if (this.fCanvas) this.fCanvas.clear();
  }

  addImage(options) {
    const node = new FImage(this.fCanvas, options);
    this.nodeMap.set(node.id, node);
    return node;
  }

  init(canvasDom) {
    this.nodeMap = new Map();
    this.fCanvas = new fabric.Canvas(canvasDom, {
      preserveObjectStacking: true, // 保持对象的堆叠顺序
    });
    this.mouseZoomComponent = new MouseZoomComponent(this.fCanvas);
  }
  destroy() {
    this.mouseZoomComponent.destroy();
    this.fCanvas.dispose();
  }
}
