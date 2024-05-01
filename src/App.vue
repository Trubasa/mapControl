<template>
  <div id="app">
    <map-control
      ref="mapControlRef"
      :width="1000"
      :height="600"
      :editable="state.editable"
      :zoomable="state.zoomable"
      :movable="state.movable"
      @ready="readyHandle"
    ></map-control>

    <div>
      <p>tips: 点击切换状态</p>
      <div @click="state.editable = !state.editable">
        是否可编辑：{{ state.editable }}
      </div>
      <div @click="state.zoomable = !state.zoomable">
        是否可缩放：{{ state.zoomable }}
      </div>
      <div @click="state.movable = !state.movable">
        是否可拖拽查看：{{ state.movable }}
      </div>
    </div>
  </div>
</template>

<script>
import MapControl from "./components/map-control/map-control.vue";
export default {
  components: { MapControl },
  name: "app",
  data() {
    return {
      elcCanvas: null,
      state: {
        editable: true,
        zoomable: true,
        movable: true,
      },
    };
  },
  methods: {
    readyHandle() {
      console.log("readyHandle");
      this.elcCanvas = this.$refs.mapControlRef.elcCanvas;

      this.elcCanvas.addImage({
        src: "./public/images/map.webp",
        scaleY: 1,
        scaleX: 1,
        toBack: true,
      });
      this.elcCanvas.addImage({
        id: 1,
        src: "./public/images/location.png",
        scaleY: 0.4,
        scaleX: 0.4,
      });
      this.elcCanvas.addImage({
        id: 2,
        src: "./public/images/location.png",
        left: 100,
        top: 100,
        scaleY: 0.4,
        scaleX: 0.4,
      });
      this.elcCanvas.addImage({
        id: 3,
        src: "./public/images/location.png",
        left: 200,
        top: 200,
        scaleY: 0.4,
        scaleX: 0.4,
      });
      /* var rect = new fabric.Rect({
      left: 100, //距离画布左侧的距离，单位是像素
      top: 100, //距离画布上边的距离
      fill: "red", //填充的颜色
      width: 100, //方形的宽度
      height: 100, //方形的高度
    });
    this.elcCanvas.fCanvas.add(rect); */
      window.$elcCanvas = this.elcCanvas;

      // this.elcCanvas = new ElcCanvas(this.$refs.container);
      // fabricManager.init(this.$refs.container);
      /* var rect = new fabric.Rect({
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
      }); */
      // const canvas = fabricManager.fCanvas;
      // 设置缩放的初始比例
      // 鼠标滚轮事件的监听器
      // canvasUtils.registerZoomHandler(fabricManager.fCanvas);
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
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style></style>
