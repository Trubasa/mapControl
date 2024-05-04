import { constant } from "../utils/constant";
import { utils } from "../utils/utils";
export class BaseElcNode {
  constructor() {
    this.id = utils.uuid();
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  /** 获取当前位置 */
  getPosition() {
    return {
      x: this.options.x,
      y: this.options.y,
    };
  }

  /** 选中 */
  registerDefaultListener() {
    this.onDefaultDeselectHandle = this.onDefaultDeselect.bind(this);
    this.fNode.on("deselected", this.onDefaultDeselectHandle);
  }
  unregisterDefaultListener() {
    this.fNode.off("deselected", this.onDefaultDeselectHandle);
  }
  onDefaultDeselect() {
    // console.log("change before", this.options.x, this.options.y);
    this.options.x = this.fNode.left;
    this.options.y = this.fNode.top;
    // console.log("change after", this.options.x, this.options.y);
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
      this.registerDefaultListener();
    }
  }

  init() {
    throw new Error(
      constant.ERROR_TYPE.SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS
    );
  }
  destroy() {
    this.unregisterDefaultListener();
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
