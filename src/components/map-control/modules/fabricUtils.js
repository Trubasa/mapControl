import { fabric } from "fabric";

export const fabricUtils = {
  /** 批量删除画布中元素 */
  removefNodesFromCanvas(fCanvas, fNodes) {
    fNodes.forEach((ele) => {
      fCanvas.remove(ele);
    });
  },
  /** 获取变化的参数 */
  getOptionsFromFNode(fNode) {
    return {
      scaleX: fNode.scaleX || 1,
      scaleY: fNode.scaleY || 1,
      angle: fNode.angle || 0,
      top: fNode.top || 0,
      left: fNode.left || 0,
      width: fNode.width || 0,
      height: fNode.height || 0,
    };
  },
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
