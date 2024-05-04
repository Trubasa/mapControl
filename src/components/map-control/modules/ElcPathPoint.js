import { BaseElcNode } from "./BaseElcNode";
import { fabricUtils } from "./fabricUtils";
import { constant } from "../../../constant";
import { ElcText } from "./ElcText";
export class ElcPathPoint extends BaseElcNode {
  constructor(elcCanvas, options = {}) {
    super();
    this.init(elcCanvas, options);
  }

  init(elcCanvas, options) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = elcCanvas.fCanvas;
    this.elcText = "";
    this.options = {
      originX: "center",
      originY: "bottom",
      src: "./public/images/location.png",
      left: 0,
      top: 0,
      //   lockRotation: true,
      //   lockScalingY: true,
      //   lockScalingX: true,
      layer: constant.Layer.PATH,
      ...options,
    };
    if (options.x) {
      this.options.left = options.x;
    }
    if (options.y) {
      this.options.top = options.y;
    }
    if (this.options.extraEnableFunc) {
      this.enable = this.options.extraEnableFunc();
    }
    this.defaultParameterProcessing(options);

    this.loadImg();
    this.loadText();
  }
  destroy() {
    throw new Error(
      constant.ERROR_TYPE.SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS
    );
  }

  loadText() {
    this.elcText = new ElcText(this.elcCanvas, this.options);
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
