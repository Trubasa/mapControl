import { fabric } from "fabric";

export const fabricUtils = {
  /** 加载图片 */
  loadImg(imgSrc) {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(imgSrc, function (img, isError) {
        if (isError) {
          reject(isError);
          return;
        }
        resolve(img);
      });
    });
  },
};
