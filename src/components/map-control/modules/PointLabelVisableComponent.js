import { BaseComponent } from "./BaseComponent";
import { constant } from "../utils/constant";
import { bus } from "../utils/bus";

export class PointLabelVisableComponent extends BaseComponent {
  constructor(elcCanvas) {
    super();
    this.init(elcCanvas);
  }

  set enable(value) {
    this._enable = value;
    this.setPointLabelVisable();
  }

  get enable() {
    return this._enable;
  }

  setPointLabelVisable() {
    bus.$emit(constant.EVENT_LIST.POINT_LABEL_VISIBLE, this.enable);
  }

  init(elcCanvas) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = this.elcCanvas.fCanvas;
  }

  destroy() {}
}
