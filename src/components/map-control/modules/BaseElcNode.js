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

  defaultParameterProcessing(params) {
    if (params.id) this.id = params.id;
    /* if (params.toBack) {
      if (this.fNode) {
        this.fNode.sendToBack();
      }
    } */
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
