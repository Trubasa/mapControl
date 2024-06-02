import { BaseElcNode } from "./BaseElcNode";
import { fabricUtils } from "./fabricUtils";
import { constant } from "../utils/constant";
export class ElcImage extends BaseElcNode {
  constructor(elcCanvas, options = {}, extra = {}) {
    super();
    this.init(elcCanvas, options, extra);
  }
  init(elcCanvas, options, extra) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = elcCanvas.fCanvas;
    this.extra = extra;
    this.options = options;
    this.defaultParameterProcessing(options);

    this.loadImg();
  }
  destroy() {
    this.unRegisterListener();
    this.fCanvas.remove(this.fNode);
  }

  registerListener() {
    this.onModifiedHandle = this.onModified.bind(this);
    this.fNode.on("modified", this.onModifiedHandle);

    this.onDeselectHandle = this.onDeselect.bind(this);
    this.fNode.on("deselected", this.onDeselectHandle);
  }
  unRegisterListener() {
    if (this.fNode) {
      this.fNode.off("modified", this.onModifiedHandle);
      this.fNode.off("deselected", this.onDeselectHandle);
    }
  }
  onDeselect() {
    if (this.extra && this.extra.deselectFunc) {
      this.extra.deselectFunc();
    }
  }

  onModified(e) {
    if (this.extra && this.extra.modifiedFunc) {
      this.extra.modifiedFunc();
    }
  }

  getAllFNodes() {
    return [this.fNode]
  }

  isFNodesReady() {
    return this.getAllFNodes().every(ele => !!ele)
  }

  loadImg() {
    fabricUtils
      .loadImg(this.options.src)
      .then((img) => {
        this.fNode = img;
        img.set({
          ...this.options
        },);
        // this.fCanvas.add(img);
        this.registerListener();
        this.create();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
