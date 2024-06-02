import { BaseElcNode } from "./BaseElcNode";
import { fabricUtils } from "./fabricUtils";
import { constant } from "../utils/constant";
import { ElcText } from "./ElcText";
import { ElcImage } from "./ElcImage";
import { bus } from "../utils/bus";
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
    this.onPointLabelVisableChange();

    this.onPointLabelVisableChangeHandle =
      this.onPointLabelVisableChange.bind(this);
    bus.$on(
      constant.EVENT_LIST.POINT_LABEL_VISIBLE,
      this.onPointLabelVisableChangeHandle
    );
  }

  onPointLabelVisableChange() {
    let isShow = true;
    if (this.elcCanvas.pointLabelVisableComponent) {
      isShow = this.elcCanvas.pointLabelVisableComponent.enable;
    }
    if (isShow) {
      this.loadText();
    } else {
      this.clearText();
    }
  }

  destroy() {
    this.clearPoint();
    this.clearText();
    bus.$off(
      constant.EVENT_LIST.POINT_LABEL_VISIBLE,
      this.onPointLabelVisableChangeHandle
    );
  }

  clearPoint() {
    this.elcImage.destroy();
  }
  clearText() {
    if (this.elcText) {
      this.elcText.destroy();
    }
  }

  loadText() {
    if (this.canIRenderText()) {
      this.elcText = new ElcText(
        this.elcCanvas,
        {
          lockMovementX: true,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockRotation: true,
          ...this.options,
        },
        this.extra
      );
    }
  }

  canIRenderText() {
    if (this.elcCanvas && this.elcCanvas.pointLabelVisableComponent) {
      return this.elcCanvas.pointLabelVisableComponent.enable;
    }
    return true;
  }

  getAllFNodes() {
    return [this.elcImage.fNode, this.elcText.fNode];
  }

  isFNodesReady() {
    return this.getAllFNodes().every(ele => !!ele)
  }

  keepRotation(angle) {
    this.elcImage.fNode.set({
      angle: -angle,
    });
    this.elcText.fNode.set({
      angle: -angle,
    });
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
        originX: "center",
        originY: "bottom",
        src: "./public/images/location.png",
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
