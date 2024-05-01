import { BaseComponent } from "./BaseComponent";

export class KeyboardEventsComponent extends BaseComponent {
  constructor(fCanvas) {
    super();
    this.init(fCanvas);
  }

  onKeyDown(event) {
    if (!this.enable) return;

    // 记录按下的键
    this.pressedKeys.add(event.key);
    console.log(`Key pressed: ${event.key}`, Array.from(this.pressedKeys));
  }

  onKeyUp(event) {
    if (!this.enable) return;

    // 移除松开的键
    this.pressedKeys.delete(event.key);
    console.log(`Key released: ${event.key}`, Array.from(this.pressedKeys));
  }

  init(elcCanvas) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = this.elcCanvas.fCanvas;

    // 初始化按键存储集合
    this.pressedKeys = new Set();

    // 绑定事件处理器
    this.onKeyDownHandle = this.onKeyDown.bind(this);
    this.onKeyUpHandle = this.onKeyUp.bind(this);

    // 添加事件监听器到document上，以便捕获所有键盘事件
    document.addEventListener("keydown", this.onKeyDownHandle);
    document.addEventListener("keyup", this.onKeyUpHandle);
  }

  destroy() {
    // 从document上移除事件监听器
    document.removeEventListener("keydown", this.onKeyDownHandle);
    document.removeEventListener("keyup", this.onKeyUpHandle);
  }
}
