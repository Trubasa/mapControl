<template>
  <div id="app" style="display: flex">
    <!-- 左边 -->
    <map-control
      ref="mapControlRef"
      :width="1000"
      :height="600"
      :editable="state.editable"
      :zoomable="state.zoomable"
      :movable="state.movable"
      @ready="readyHandle"
    ></map-control>

    <!-- 右边 -->
    <div style="margin-left: 20px">
      <h3>配置:</h3>
      <div style="cursor: pointer">
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
      <div style="margin-top: 10px">
        <h3>操作说明:</h3>
        <div>
          1. 点击上面的配置文本切换状态<br />
          2. 鼠标左键：【框选与编辑】<br />
          空格+鼠标左键：【拖拽画布查看】<br />
          3. 滚轮：【缩放】<br />
        </div>
      </div>

      <!-- <h3>功能说明：</h3>
      <div>
        <input type="checkbox" checked disabled /> 以鼠标位置为中心进行缩放画布
        <br />
        <input type="checkbox" checked disabled /> 拖拽画布进行查看
        <br />
        <input type="checkbox" checked disabled />
        选中物体进行编辑（移动、缩放、多选等，基于fabric.js默认支持）
        <br />
      </div> -->
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
      window.$elcCanvas = this.elcCanvas;
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style></style>
