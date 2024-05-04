import { ElcImage } from "./ElcImage";
import { fabricUtils } from "./fabricUtils";
import { MouseZoomComponent } from "./MouseZoomComponent";
import { EditableComponent } from "./EditableComponent";
import { MovableComponent } from "./MovableComponent";
import { KeyboardEventsComponent } from "./KeyboardEventsComponent";
import { LayerComponent } from "./LayerComponnet";
import { constant } from "../../../constant";
import { ElcPath } from "./ElcPath";

export class ElcCanvas {
  constructor(canvasDom) {
    this.init(canvasDom);
  }

  reset() {
    if (this.fCanvas) this.fCanvas.clear();
  }
  /* initLayer() {
    this.layerDict = {};
    // 并在 layerDict 中为每个层级创建一个空数组
    for (const layer in constant.Layer) {
      // 使用constant.Layer[layer] 获取层级的值，作为键
      const layerValue = constant.Layer[layer];
      // 初始化每个层级的值为空数组
      this.layerDict[layerValue] = new fabric.Group([], {});
      this.fCanvas.add(this.layerDict[layerValue]);
    }
  } */
  init(canvasDom) {
    // this.initLayer();
    this.nodeMap = new Map();
    this.fCanvas = new fabric.Canvas(canvasDom, {
      preserveObjectStacking: true, // 保持对象的堆叠顺序
    });
    this.layerComponent = new LayerComponent(this.fCanvas);
    this.mouseZoomComponent = new MouseZoomComponent(this);
    this.editableComponent = new EditableComponent(this, {
      extraEnableFunc: this.extraEditableFunc.bind(this),
    });
    this.movableComponent = new MovableComponent(this, {
      extraEnableFunc: this.extraMovableFunc.bind(this),
    });
    this.keyboardEventsComponent = new KeyboardEventsComponent(this);
  }
  destroy() {
    this.layerComponent.destroy();
    this.mouseZoomComponent.destroy();
    this.editableComponent.destroy();
    this.movableComponent.destroy();
    this.keyboardEventsComponent.destroy();
    this.fCanvas.dispose();
  }
  addImage(options) {
    const node = new ElcImage(this, options);
    this.nodeMap.set(node.id, node);
    return node;
  }
  addPath(options) {
    const path = new ElcPath(this, options);
    this.nodeMap.set(path.id, path);
    return path;
  }

  extraMovableFunc() {
    // 如果用户按下了空格键，就允许拖动
    if (this.keyboardEventsComponent) {
      const pressedKeys = this.keyboardEventsComponent.pressedKeys;
      console.log(pressedKeys);
      return pressedKeys.has(constant.KEYBOARD_KEY.SPACE);
    } else {
      return true;
    }
  }
  extraEditableFunc() {
    // 如果用户按下了空格键，就不允许编辑
    if (this.keyboardEventsComponent) {
      const pressedKeys = this.keyboardEventsComponent.pressedKeys;
      return !pressedKeys.has(constant.KEYBOARD_KEY.SPACE);
    } else {
      return true;
    }
  }

  loadData(data) {
    this.fCanvas.loadFromJSON(data);
    this.fCanvas.renderAll();
  }
  exportData(extraKeys) {
    return this.fCanvas.toJSON(["id", ...extraKeys]);
  }

  /** 清除选中 */
  clearSelection() {
    this.fCanvas.discardActiveObject();
    this.refresh();
  }
  refresh() {
    this.fCanvas.requestRenderAll();
  }
}
