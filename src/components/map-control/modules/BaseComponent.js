import { constant } from "../utils/constant";

export class BaseComponent {
  constructor() {
    this.enable = true;
  }
  get enable() {
    return this._enable;
  }
  set enable(value) {
    this._enable = value;
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
}
