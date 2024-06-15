import { bus } from "../utils/bus";
import { constant } from "../utils/constant";
import { BaseComponent } from "./BaseComponent";

export class KeepElementViewSizeComponent extends BaseComponent {
  constructor(elcCanvas, options) {
    super();
    this.init(elcCanvas, options);
  }

  init(elcCanvas, options) {
    this.elcCanvas = elcCanvas;
    this.options = options;
    this.fCanvas = this.elcCanvas.fCanvas;
    this.onViewportChangeHandle = this.onViewportChange.bind(this);
    bus.$on(constant.EVENT_LIST.ZOOM_FINISH, this.onViewportChangeHandle);
    this.fCanvas.on("object:added", this.onViewportChangeHandle);
    this.fCanvas.on("object:modified", this.onViewportChangeHandle);
  }

  destroy() {
    bus.$off(constant.EVENT_LIST.ZOOM_FINISH, this.onViewportChangeHandle);
    this.fCanvas.off("object:modified", this.onViewportChangeHandle);
  }

  onViewportChange() {
    const zoom = this.fCanvas.getZoom();
    console.log("zoom", zoom);
    this.fCanvas.forEachObject((object) => {
      this.adjustObjectSize(object, zoom);
      if (object.type === "group") {
        object.forEachObject((obj) => this.adjustObjectSize(obj, zoom, object));
      }
    });
    this.elcCanvas.refresh();
  }

  adjustObjectSize(object, zoom, parent = null) {
    if (object.keepElementViewSize) {
      this.updateObjectSize(object, zoom, parent);
    }
  }

  updateObjectSize(object, zoom, parent = null) {
    if (!zoom) {
      zoom = this.fCanvas.getZoom();
    }
    if (!object.originalScaleX) {
      object.originalScaleX = object.scaleX;
    }
    if (!object.originalScaleY) {
      object.originalScaleY = object.scaleY;
    }
    if (object.keepElementViewSize) {
      let scaleX = object.originalScaleX / zoom;
      let scaleY = object.originalScaleY / zoom;

      if (parent) {
        scaleX /= parent.scaleX;
        scaleY /= parent.scaleY;
      }

      console.log("scaleX", scaleX, "scaleY", scaleY);
      object.set({
        scaleX: scaleX,
        scaleY: scaleY,
      });
    }
  }
}
