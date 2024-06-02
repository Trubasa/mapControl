import { constant } from "../utils/constant";
import { BaseComponent } from "./BaseComponent";

export class LayerComponent extends BaseComponent {
  constructor(fCanvas) {
    super();
    this.init(fCanvas);
  }

  init(fCanvas) {
    this.fCanvas = fCanvas;

    // 初始化层级字典
    this.layerDict = {};
    this.fGroupDict = {};
    for (const key in constant.Layer) {
      const layerName = constant.Layer[key];
      if (!this.layerDict[layerName]) {
        this.layerDict[layerName] = [];
      }
    }
  }

  // 添加对象到指定层级
  addToLayer(layerName, object) {
    // console.log("addToLayer", layerName, object.id);
    if (!layerName) {
      layerName = constant.Layer.DEFAULT
    }

    this.layerDict[layerName].push(object);
    this.fCanvas.add(object);
    object.moveTo(constant.LAYER_VALUE[layerName]);
    /* console.log("layerName", layerName)
    console.log("constant.LAYER_VALUE[layerName]", constant.LAYER_VALUE[layerName]) */
  }

  // 从指定层级移除对象
  removeFromLayer(layerName, object) {
    if (this.layerDict[layerName]) {
      const index = this.layerDict[layerName].indexOf(object);
      if (index > -1) {
        this.layerDict[layerName].splice(index, 1);
        this.fCanvas.remove(object);
      }
    }
  }

  // 获取指定层级的所有对象
  getObjectsFromLayer(layerName) {
    return this.layerDict[layerName] || [];
  }

  // 清空指定层级的所有对象
  clearLayer(layerName) {
    if (this.layerDict[layerName]) {
      this.layerDict[layerName].forEach((object) => {
        this.fCanvas.remove(object);
      });
      this.layerDict[layerName] = [];
    }
  }

  // 销毁方法，用于清理
  destroy() {
    Object.keys(this.layerDict).forEach((layerName) => {
      this.clearLayer(layerName);
    });
    this.layerDict = {};
  }
}
