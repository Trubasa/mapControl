import { BaseElcNode } from "./BaseElcNode";
import { fabricUtils } from "./fabricUtils";
import { constant } from "../../../constant";
import { ElcText } from "./ElcText";
import { ElcImage } from "./ElcImage";
export class ElcPathPoint extends BaseElcNode {
  constructor(elcCanvas, options = {}, extra = {}) {
    super();
    this.init(elcCanvas, options, extra);
  }

  init(elcCanvas, options, extra) {
    this.extra = extra;
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

    this.defaultParameterProcessing(this.options);
    this.pathPointImgScaleNum = this.options.pathPointImgScaleNum || 1;

    this.loadPoint();
    this.loadText();
  }

  destroy() {
    this.clearPoint();
    this.clearText();
  }

  clearPoint() {
    this.elcImage.destroy();
  }
  clearText() {
    this.elcText.destroy();
  }

  loadText() {
    this.elcText = new ElcText(this.elcCanvas, this.options, this.extra);
  }

  relevanceNodes() {
    return [this.elcImage.fNode, this.elcText.fNode];
  }

  resetSomeProp(options) {
    this.elcImage.fNode.set({
      scaleY: this.pathPointImgScaleNum,
      scaleX: this.pathPointImgScaleNum,
      angle: 0,
    });
    this.elcText.fNode.set({
      scaleX: 1,
      scaleY: 1,
      angle: 0,
    });
  }

  loadPoint() {
    const elcImage = new ElcImage(
      this.elcCanvas,
      {
        scaleY: this.pathPointImgScaleNum,
        scaleX: this.pathPointImgScaleNum,
        ...this.options,
      },
      this.extra
    );
    this.elcImage = elcImage;
    /* fabricUtils
      .loadImg(this.options.src)
      .then((img) => {
        this.fNode = img;
        img.set(this.options);
        // this.fCanvas.add(img);
        this.create();
      })
      .catch((err) => {
        console.error(err);
      }); */
  }
}
