<template>
  <div class="map-control">
    <slot> this is slot </slot>
    <canvas
      ref="container"
      style="border: 1px solid #999"
      width="800"
      height="600"
    ></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";
import { useFabricManager } from "./canvas-manager/useFabricManager.js";
import { canvasUtils } from "./canvas-manager/canvasUtils.js";
const fabricManager = useFabricManager();
export default {
  name: "map-control",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    fabricManager.init(this.$refs.container);
    var rect = new fabric.Rect({
      left: 100, //距离画布左侧的距离，单位是像素
      top: 100, //距离画布上边的距离
      fill: "red", //填充的颜色
      width: 100, //方形的宽度
      height: 100, //方形的高度
    });
    fabricManager.fCanvas.add(rect);

    canvasUtils
      .loadImg(
        "https://img0.baidu.com/it/u=3480411234,3896256113&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500"
      )
      .then((img) => {
        fabricManager.fCanvas.add(img);
      });

    const canvas = fabricManager.fCanvas;
    // 设置缩放的初始比例
    // 鼠标滚轮事件的监听器
    canvasUtils.registerZoomHandler(fabricManager.fCanvas);
    /* setTimeout(() => {
      canvasUtils.unregisterZoomHandler(fabricManager.fCanvas);
    }, 3000); */
    /* let canvas = new fabric.Canvas(this.$refs.container);
    var rect = new fabric.Rect({
      left: 100, //距离画布左侧的距离，单位是像素
      top: 100, //距离画布上边的距离
      fill: "red", //填充的颜色
      width: 30, //方形的宽度
      height: 30, //方形的高度
    });
    canvas.add(rect); */
  },
};
</script>
<style scoped>
.map-control {
}
</style>
