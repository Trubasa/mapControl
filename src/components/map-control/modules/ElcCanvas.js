import { FImage } from "./ElcImage";
import { fabricUtils } from "./fabricUtils";
import { MouseZoomComponent } from "./mouseZoomComponent";
import { EditableComponent } from "./EditableComponent";

export class ElcCanvas {
  constructor(canvasDom) {
    this.init(canvasDom);
  }

  reset() {
    if (this.fCanvas) this.fCanvas.clear();
  }
  init(canvasDom) {
    this.nodeMap = new Map();
    this.fCanvas = new fabric.Canvas(canvasDom, {
      preserveObjectStacking: true, // 保持对象的堆叠顺序
    });
    this.mouseZoomComponent = new MouseZoomComponent(this.fCanvas);
    this.editableComponent = new EditableComponent(this.fCanvas);
  }
  destroy() {
    this.mouseZoomComponent.destroy();
    this.editableComponent.destroy();
    this.fCanvas.dispose();
  }
  addImage(options) {
    const node = new FImage(this.fCanvas, options);
    this.nodeMap.set(node.id, node);
    return node;
  }

  loadData(data) {
    this.fCanvas.loadFromJSON(data);
    this.fCanvas.renderAll();
  }
  exportData(extraKeys) {
    return this.fCanvas.toJSON(["id", ...extraKeys]);
  }
}
