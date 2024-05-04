import { BaseComponent } from "./BaseComponent";

export class ObjectModifiedComponent extends BaseComponent {
  constructor(elcCanvas) {
    super();
    this.init(elcCanvas);
  }

  onObjectModified(e) {
    // 检查是否为多选分组对象
    this.nofityNodeModified(e);
  }

  nofityNodeModified(event) {
    const objects = Array.from(event.target._objects || []);
    objects.forEach((object) => {
      console.log(`对象被修改: `, object.id);
      const id = object.id;
      const targetElcNode = this.elcCanvas.getElcNodeById(id);
      if (targetElcNode) {
        targetElcNode.onModified(event);
      }
    });
  }

  init(elcCanvas) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = this.elcCanvas.fCanvas;

    // 绑定事件处理器
    this.onObjectModifiedHandle = this.onObjectModified.bind(this);

    // 添加事件监听器到Fabric.js的Canvas实例上
    this.fCanvas.on("object:modified", this.onObjectModifiedHandle);
  }

  destroy() {
    // 从Fabric.js的Canvas实例上移除事件监听器
    this.fCanvas.off("object:modified", this.onObjectModifiedHandle);
  }
}
