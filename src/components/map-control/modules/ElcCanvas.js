import { FImage } from "./ElcImage";
import { fabricUtils } from "./fabricUtils";
import { MouseZoomComponent } from "./MouseZoomComponent";
import { EditableComponent } from "./EditableComponent";
import { MovableComponent } from "./MovableComponent";
import { KeyboardEventsComponent } from "./KeyboardEventsComponent";
import { constant } from "../../../constant";

export class ElcCanvas {
  constructor(canvasDom) {
    this.init(canvasDom);
  }

  reset() {
    if (this.fCanvas) this.fCanvas.clear();
  }
  init(canvasDom) {
    this.nodeMap = new Map();
    this.fCanvas = new fabric.Canvas(canvasDom, {
      preserveObjectStacking: true, // 保持对象的堆叠顺序
    });
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
    this.mouseZoomComponent.destroy();
    this.editableComponent.destroy();
    this.movableComponent.destroy();
    this.keyboardEventsComponent.destroy();
    this.fCanvas.dispose();
  }
  addImage(options) {
    const node = new FImage(this.fCanvas, options);
    this.nodeMap.set(node.id, node);
    return node;
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
}
