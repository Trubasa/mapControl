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
      layerName = constant.Layer.DEFAULT;
    }

    this.layerDict[layerName].push(object);
    this.fCanvas.add(object);
    object.moveTo(constant.LAYER_VALUE[layerName]);
    // console.log("object moveTo", constant.LAYER_VALUE[layerName], object.id);
    this.reSortObjects();
  }

  reSortObjects() {
    // fabric 没有图层控制，只能通过数据中前后关系进行位置设置，所以这里添加了新元素后，应该重排一下
    const originObjects = this.fCanvas.getObjects();
    originObjects.sort((a, b) => {
      return constant.LAYER_VALUE[a.layer] - constant.LAYER_VALUE[b.layer];
    });
    // console.log("resortObjects", originObjects);
    originObjects.forEach((object, index) => {
      object.moveTo(99999999999); // 每次添加一个极大值，保证每次设置都添加数组最后
    });
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
