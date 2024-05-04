<template>
  <div id="app" style="display: flex; flex-wrap: wrap">
    <!-- 左边 -->
    <div>
      <map-control
        ref="mapControlRef"
        :width="1000"
        :height="600"
        :editable="state.editable"
        :zoomable="state.zoomable"
        :movable="state.movable"
        @ready="readyHandle"
      ></map-control>
    </div>

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

      <h3>功能：</h3>
      <div>
        <button @click="selectAllLoactionNode">选中路线以及线上的点</button
        ><br />
      </div>

      <div style="margin-top: 10px">
        <h3>操作说明:</h3>
        <div>
          1. 点击上面【配置】中的文本切换状态<br />
          2. 鼠标左键：【框选与编辑】<br />
          空格+鼠标左键：【拖拽画布查看】<br />
          3. 滚轮：【缩放】<br />
        </div>
      </div>

      <h3>待办清单：</h3>
      <div>
        <input type="checkbox" checked disabled /> 以鼠标位置为中心进行缩放画布
        <br />
        <input type="checkbox" checked disabled /> 拖拽画布进行查看
        <br />
        <input type="checkbox" checked disabled />
        选中物体进行编辑（移动、缩放、多选等，基于fabric.js默认支持）
        <br />
        <input type="checkbox" disabled /> 数据导出导入<br />
        <input type="checkbox" disabled />
        支持调整路线锚点后（新增、删除、移动），路线追踪锚点重新渲染<br />
        <input type="checkbox" disabled />
        路线锚点保持原比例与尺寸，不随编辑放大缩小、旋转<br />
        <input type="checkbox" disabled />
        支持在锚点附近显示文本内容，支持控制显示与关闭<br />
        <input type="checkbox" disabled /> 自定义右键面板功能<br />
      </div>
    </div>
  </div>
</template>

<script>
import MapControl from "./components/map-control/map-control.vue";
import { constant } from "./constant";
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
      path: [
        {
          id: 1,
          x: 100,
          y: 100,
          text: "Point 1",
        },
        {
          id: 2,
          x: 150,
          y: 180,
          text: "Point 2",
        },
        {
          id: 3,
          x: 200,
          y: 200,
          text: "Point 3",
        },
        {
          id: 4,
          x: 250,
          y: 160,
          text: "Point 4",
        },
        {
          id: 5,
          x: 300,
          y: 100,
          text: "Point 5",
        },
        {
          id: 6,
          x: 350,
          y: 140,
          text: "Point 6",
        },
        {
          id: 7,
          x: 400,
          y: 180,
          text: "Point 7",
        },
        {
          id: 8,
          x: 450,
          y: 120,
          text: "Point 8",
        },
        {
          id: 9,
          x: 500,
          y: 200,
          text: "Point 9",
        },
        {
          id: 10,
          x: 550,
          y: 160,
          text: "Point 10",
        },
        {
          id: 11,
          x: 600,
          y: 120,
          text: "Point 11",
        },
        {
          id: 12,
          x: 650,
          y: 180,
          text: "Point 12",
        },
        {
          id: 13,
          x: 400,
          y: 300,
          text: "Point 13",
        },
        {
          id: 14,
          x: 350,
          y: 250,
          text: "Point 14",
        },
        {
          id: 15,
          x: 300,
          y: 220,
          text: "Point 15",
        },
        {
          id: 16,
          x: 250,
          y: 300,
          text: "Point 16",
        },
      ],
      elcPath: null,
    };
  },
  methods: {
    readyHandle() {
      console.log("readyHandle");
      this.elcCanvas = this.$refs.mapControlRef.elcCanvas;
      const canvas = this.elcCanvas.fCanvas;
      // 添加背景图片
      this.elcCanvas.addImage({
        src: "./public/images/map.webp",
        scaleY: 1,
        scaleX: 1,
        toBack: true,
        layer: constant.Layer.BACK,
      });
      // 添加各个定位点
      /* this.path.forEach((item) => {
        this.elcCanvas.addImage({
          id: item.id,
          src: "./public/images/location.png",
          left: item.x,
          top: item.y,
          scaleY: 0.4,
          scaleX: 0.4,
        });
      }); */

      // 添加路径
      this.elcPath = this.elcCanvas.addPath({
        points: this.path,
      });

      // 创建一条线段
      /* var line = new fabric.Line([50, 100, 200, 100], {
        stroke: "red", // 线条颜色
        strokeWidth: 2, // 线条宽度
        selectable: false, // 设置线段不可选中（可选）
      }); */

      // 创建一条path
      /* var path = new fabric.Path("M 0 0 L 200 100 L 170 200");
      // path.set({ left: 120, top: 120 });
      canvas.add(path); */

      // 将线段添加到画布上
      // this.elcCanvas.fCanvas.add(line);
      // 变量赋值给window，方便调试
      window.$elcCanvas = this.elcCanvas;
    },
    selectAllLoactionNode() {
      if (this.elcPath) {
        this.elcCanvas.clearSelection();
        this.elcPath.select();
      } else {
        console.info("没有this.elcPath");
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
/* 默认的左右布局 */
#app {
  display: flex;
}

/* 移动设备视口时的上下布局 */
@media (max-width: 767px) {
  #app {
    display: block;
  }

  /* 右边部分（现在是下方）的样式调整 */
  #app > div {
    margin-left: 0;
    margin-top: 20px;
  }
}
</style>
