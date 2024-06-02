import { BaseComponent } from "./BaseComponent";

export class KeyboardEventsComponent extends BaseComponent {
  constructor(elcCanvas) {
    super();
    this.init(elcCanvas);
  }

  onKeyDown(event) {
    if (!this.enable) return;
    event.stopPropagation();
    event.preventDefault();

    // 记录按下的键
    this.pressedKeys.add(event.key);
    console.log(`Key pressed: ${event.key}`, Array.from(this.pressedKeys));
  }

  onKeyUp(event) {
    if (!this.enable) return;
    event.stopPropagation();
    event.preventDefault();

    // 移除松开的键
    this.pressedKeys.delete(event.key);
    console.log(`Key released: ${event.key}`, Array.from(this.pressedKeys));
  }

  onMouseEnter() {
    // 当鼠标移入时，绑定键盘事件
    document.addEventListener("keydown", this.onKeyDownHandle);
    document.addEventListener("keyup", this.onKeyUpHandle);
    // console.log("keyboardEvents Component mouseenter")
  }

  onMouseLeave() {
    // 当鼠标移出时，解绑键盘事件
    document.removeEventListener("keydown", this.onKeyDownHandle);
    document.removeEventListener("keyup", this.onKeyUpHandle);
    // console.log("keyboardEvents Component mouseleave")
  }

  init(elcCanvas) {
    this.elcCanvas = elcCanvas;
    this.fCanvas = this.elcCanvas.fCanvas;
    this.eventTargetDom = this.fCanvas.upperCanvasEl; // fabricjs 生产的可交互的 canvas DOM 对象

    // 初始化按键存储集合
    this.pressedKeys = new Set();

    // 绑定事件处理器
    this.onKeyDownHandle = this.onKeyDown.bind(this);
    this.onKeyUpHandle = this.onKeyUp.bind(this);

    // 绑定鼠标事件处理器
    this.onMouseEnterHandle = this.onMouseEnter.bind(this);
    this.onMouseLeaveHandle = this.onMouseLeave.bind(this);

    // 添加鼠标事件监听器到 this.eventTargetDom 上
    this.eventTargetDom.addEventListener("mouseenter", this.onMouseEnterHandle);
    this.eventTargetDom.addEventListener("mouseleave", this.onMouseLeaveHandle);
  }

  destroy() {
    // 从 document 上移除键盘事件监听器
    document.removeEventListener("keydown", this.onKeyDownHandle);
    document.removeEventListener("keyup", this.onKeyUpHandle);

    // 从 this.eventTargetDom 上移除鼠标事件监听器
    this.eventTargetDom.removeEventListener("mouseenter", this.onMouseEnterHandle);
    this.eventTargetDom.removeEventListener("mouseleave", this.onMouseLeaveHandle);
  }
}