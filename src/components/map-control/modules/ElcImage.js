import { BaseElcNode } from "./BaseElcNode";
import { fabricUtils } from "./fabricUtils";
export class FImage extends BaseElcNode {
  constructor(elcCanvas, options = {}) {
    super();
    this.init(elcCanvas, options);
  }
  init(elcCanvas, options) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = elcCanvas.fCanvas;
    this.options = {
      ...options,
    };
    this.defaultParameterProcessing(options);

    this.loadImg();
  }
  destroy() {
    throw new Error(
      constant.ERROR_TYPE.SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS
    );
  }

  loadImg() {
    fabricUtils
      .loadImg(this.options.src)
      .then((img) => {
        this.fNode = img;
        img.set(this.options);
        // this.fCanvas.add(img);
        this.create();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
