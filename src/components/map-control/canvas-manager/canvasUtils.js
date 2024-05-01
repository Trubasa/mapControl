import { fabric } from "fabric";

export const canvasUtils = {
  /** 滚轮缩放handle */
  // 定义一个命名的回调函数
  zoomHandler(opt) {
    var delta = opt.e.deltaY;
    var zoomStep = 0.1;
    var zoom = this.getZoom(); // 注意这里使用了 "this" 来引用 canvas

    if (delta < 0) {
      zoom *= 1 + zoomStep;
    } else {
      zoom /= 1 + zoomStep;
    }

    zoom = Math.max(0.1, zoom);
    zoom = Math.min(20, zoom);

    var pointer = this.getPointer(opt.e, true);
    var mousePos = { x: pointer.x, y: pointer.y };

    this.zoomToPoint(new fabric.Point(mousePos.x, mousePos.y), zoom);

    opt.e.preventDefault();
    opt.e.stopPropagation();
  },

  // 注册事件监听器
  registerZoomHandler(canvas) {
    canvas.on("mouse:wheel", this.zoomHandler);
  },

  // 取消事件监听器
  unregisterZoomHandler(canvas) {
    canvas.off("mouse:wheel", this.zoomHandler);
  },

  /** 加载图片 */
  loadImg(imgSrc) {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(imgSrc, function (img, isError) {
        if (isError) {
          reject(isError);
          return;
        }

        img.set({
          left: 0,
          top: 0,
          scaleX: 1,
          scaleY: 1,
        });
        resolve(img);
      });
    });
  },
};
