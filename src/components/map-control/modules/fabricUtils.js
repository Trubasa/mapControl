import { fabric } from "fabric";

export const fabricUtils = {
  /**
   * 计算两个点之间的角度
   * @param {Object} point1 - 第一个点，包含 x 和 y 属性
   * @param {Object} point2 - 第二个点，包含 x 和 y 属性
   * @returns {number} 角度值，范围在 0 到 360 度
   */
  calculateAngle(point1, point2) {
    const deltaX = point2.x - point1.x;
    const deltaY = point1.y - point2.y; // 处理画布坐标系，y 轴向下为正

    // 使用 Math.atan2 计算角度，结果是弧度
    let angleInRadians = Math.atan2(deltaY, deltaX);

    // 将弧度转换为度数
    let angleInDegrees = angleInRadians * (180 / Math.PI);

    // 确保角度在 0 到 360 度范围内
    if (angleInDegrees < 0) {
      angleInDegrees += 360;
    }

    return angleInDegrees;
  },
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
