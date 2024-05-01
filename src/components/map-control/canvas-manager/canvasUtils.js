import { fabric } from "fabric";

export const canvasUtils = {
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
