import { constant } from "../../../constant";
import { utils } from "../../../utils";
export class BaseElcNode {
  constructor() {
    this.id = utils.uuid();
  }
  get enable() {
    return this._id;
  }
  set enable(value) {
    this._id = value;
  }

  /** 选中当前元素 */
  select() {
    this.fCanvas.setActiveObject(
      new fabric.ActiveSelection([this.fNode], {
        canvas: this.fCanvas,
      })
    );
    this.elcCanvas.refresh();
  }

  /** 相关联的所有节点 */
  relevanceNodes() {
    return [this.fNode];
  }

  defaultParameterProcessing(params) {
    if (!params.id) {
      params.id = utils.uuid();
    }
    if (!params.layer) params.layer = constant.Layer.DEFAULT;
    this.id = params.id;
  }

  create() {
    if (this.elcCanvas.layerComponent) {
      const layer = this.options.layer;
      this.elcCanvas.layerComponent.addToLayer(layer, this.fNode);
    }
  }

  init() {
    throw new Error(
      constant.ERROR_TYPE.SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS
    );
  }
  destroy() {
    throw new Error(
      constant.ERROR_TYPE.SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS
    );
  }

  onAddedToCanvas() {
    throw new Error(
      constant.ERROR_TYPE.SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS
    );
  }

  onReMovedFromCanvas() {
    throw new Error(
      constant.ERROR_TYPE.SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS
    );
  }
}
