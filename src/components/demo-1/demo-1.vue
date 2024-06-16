<template>
  <div class="demo-1" style="display: flex; flex-wrap: wrap">
    <!-- 左边 -->
    <div>
      <map-control
        ref="mapControlRef"
        :width="800"
        :height="600"
        :editable="state.editable"
        :zoomable="state.zoomable"
        :movable="state.movable"
        :isShowPointText="state.showPointText"
        @ready="readyHandle"
      ></map-control>
    </div>

    <!-- 右边 -->
    <div style="margin-left: 20px; flex-grow: 1">
      <h3>功能：</h3>
      <el-card>
        手动移动
        <el-button @click="moveAndRender" type="primary">步进</el-button>
        <br />
        自动移动
        <el-switch v-model="autoMove" @change="autoMoveChange"></el-switch>
      </el-card>
    </div>
  </div>
</template>

<script>
import MapControl from "../map-control/map-control.vue";
import { fabricUtils } from "../map-control/modules/fabricUtils";
import { constant } from "../map-control/utils/constant";
import { utils } from "../map-control/utils/utils";
export default {
  components: { MapControl },
  name: "app",
  data() {
    return {
      elcCanvas: null,
      autoMove: false,
      autoMoverTimer: null,
      state: {
        editable: false,
        zoomable: true,
        movable: true,
        showPointText: true,
      },
      pathDone: [
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
      ],
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
      elcCanvas: null,
      elcPathTransformOptions: {},
      carRotation: 0, // 车子的旋转的角度
    };
  },
  methods: {
    saveTransformOptions() {
      localStorage.setItem(
        "elcPathTransformOptions",
        JSON.stringify(this.elcPathTransformOptions)
      );
      this.$message.success("保存成功");
    },
    loadTransformOptions() {
      const data = localStorage.getItem("elcPathTransformOptions");
      if (data) {
        const options = JSON.parse(data);
        this.elcPathTransformOptions = options;
        this.elcPath.fNode.set(this.elcPathTransformOptions);
        this.elcPath.keepPathPointRotation();

        // 应用变化到已经走过的路线
        this.elcPathDone.fNode.set(this.elcPathTransformOptions);

        // 应用变化到车辆
        this.car.fNode.set(this.elcPathTransformOptions);
      }
    },
    objectModifiedHandle(e) {
      // console.log(e)
      if (e.target.id == "my-path-whole") {
        const fNodeOptions = fabricUtils.getOptionsFromFNode(e.target);
        // console.log("fNodeOptions", fNodeOptions);
        this.elcPathTransformOptions = fNodeOptions;

        /* fabricUtils.rotateGroupKeepElementsFixed(e.target, e.target.angle, e.target.scaleX, e.target.scaleY)
        this.elcCanvas.refresh() */
      }
    },
    registerBusEvent() {
      this.elcCanvas.bus.$on(
        constant.EVENT_LIST.OBJECT_MODIFIED,
        this.objectModifiedHandle
      );
    },
    unRegisterBusEvent() {
      this.elcCanvas.bus.$off(
        constant.EVENT_LIST.OBJECT_MODIFIED,
        this.objectModifiedHandle
      );
    },
    readyHandle(elcCanvas) {
      console.log("readyHandle");
      // this.elcCanvas = this.$refs.mapControlRef.elcCanvas;
      this.elcCanvas = elcCanvas;

      this.registerBusEvent();
      const canvas = this.elcCanvas.fCanvas;
      // 添加背景图片
      this.bg = this.elcCanvas.addImage({
        src: "./public/images/map.webp",
        scaleY: 1,
        scaleX: 1,
        layer: constant.Layer.BACK,
      });

      // 添加路径
      this.elcPath = this.elcCanvas.addPath({
        id: "my-path-whole",
        points: this.path,
        pathPointImgScaleNum: 0.4,
      });

      let groupAttrs = null; // 完整路线的外包裹group的参数
      utils
        .waitForCondition(() => {
          return this.elcPath.isFNodesReady();
        }, "等待elcPath超时")
        .then(() => {
          const fNodeOptions = fabricUtils.getOptionsFromFNode(
            this.elcPath.fNode
          );
          console.log("fNodeOptions", fNodeOptions);
          this.elcPathTransformOptions = fNodeOptions;
          groupAttrs = fNodeOptions;
        })
        .then(() => {
          // 再绘制一条路线，表示走过的距离
          this.elcPathDone = this.elcCanvas.addPath({
            id: "my-path-done",
            points: this.pathDone,
            pathPointImgScaleNum: 0.4,
            stroke: "green",
            showPathOnly: true, // 只渲染路线，不渲染锚点与描述
            groupAttrs,
            // neverSelect: true,
          });
        })
        .then(() => {
          // 添加车辆，锁定无法进行缩放和旋转
          const carPoint = this.path[this.pathDone.length - 1];
          this.car = this.elcCanvas.addCar({
            id: "car-1",
            src: "./public/images/car.png",
            left: carPoint.x,
            top: carPoint.y,
            scaleY: 0.2,
            scaleX: 0.2,
            layer: constant.Layer.CAR,
            groupAttrs,
            // neverSelect: true,
          });
          utils
            .waitForCondition(() => {
              return this.car.isFNodesReady();
            }, "等待car超时")
            .then(() => {
              // console.log("this.car", this.car.getAllFNodes());
              this.updateCarRotation();
            });
        })
        .then(() => {
          /* setInterval(() => {
            this.moveAndRender();
          }, 100); */
        });

      // #region [debug]
      window.$elcCanvas = this.elcCanvas;
      window.$getObjects = this.elcCanvas.fCanvas.getObjects.bind(
        this.elcCanvas.fCanvas
      );
      window.$allLayers = () => {
        this.elcCanvas.fCanvas.getObjects().forEach((item) => {
          console.log(item.id, item.layer);
        });
      };
      // #endRegion
    },
    updateCarRotation() {
      if (this.car && this.car.fNode && this.car.fNode.set) {
        this.car.updateCarRotation(this.carRotation);
        this.elcCanvas.refresh();
      }
    },
    autoMoveChange() {
      if (this.autoMove) {
        this.autoMoverTimer = setTimeout(() => {
          if (this.isReachedEnd()) {
            // 已经抵达了终点，不需要再移动
            return;
          }
          this.moveAndRender();
          this.autoMoveChange();
        }, 300);
      }
    },
    clearAutoMoveTimer() {
      if (this.autoMoverTimer) {
        clearInterval(this.autoMoverTimer);
        this.autoMoverTimer = null;
      }
    },

    // #region [logic]
    // Helper function to move a single step toward the target value
    moveToward(current, target, step) {
      // Calculate the distance between current and target in both x and y directions
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      // Calculate the distance to move in one step towards the target
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If the distance is less than or equal to the step, return the target coordinates
      if (distance <= step) {
        return { x: target.x, y: target.y };
      }

      // Calculate the ratio of step to the distance
      const ratio = step / distance;

      // Calculate the new x and y coordinates based on the ratio
      const newX = current.x + dx * ratio;
      const newY = current.y + dy * ratio;

      return { x: newX, y: newY };
    },

    samePoint(p1, p2) {
      return p1.x === p2.x && p1.y === p2.y;
    },

    /** 判断2个点位是否相等，执行是否要添加一个新的节点 */
    dualTwoPoint() {
      const path = this.path;
      const pathDone = this.pathDone;
      const nextPoint = path[pathDone.length];

      const current = pathDone[pathDone.length - 1];
      let target = path[pathDone.length - 1];

      if (this.samePoint(current, target)) {
        if (nextPoint) {
          // 加入下个点，但是这个点的xy重置为当前点
          pathDone.push({
            ...nextPoint,
            x: current.x,
            y: current.y,
          });
          let targetPoint = path[pathDone.length];
        }
      }
      return {
        lastPoint: current,
        targetPoint: target,
      };
    },
    /** 是否位移到了终点 */
    isReachedEnd() {
      const current = this.pathDone[this.pathDone.length - 1];
      const target = this.path[this.path.length - 1];
      return this.samePoint(current, target);
    },

    moveAndRender() {
      const step = 20;
      const path = this.path;
      const pathDone = this.pathDone;
      const moveToward = this.moveToward;
      const nextPoint = path[pathDone.length];

      const { lastPoint, targetPoint } = this.dualTwoPoint(
        lastPoint,
        targetPoint
      );

      let { x: newX, y: newY } = moveToward(lastPoint, targetPoint, step);
      lastPoint.x = newX;
      lastPoint.y = newY;

      // Update the car's position
      this.elcPathDone.updatePath();
      this.car.updatePosition(newX, newY);
      const point1 = this.pathDone[this.pathDone.length - 2];
      const point2 = this.path[this.pathDone.length - 1];
      console.log("point1,point2", point1, point2);
      const angle = fabricUtils.calculateAngle(point1, point2);
      console.log("angle", angle);
      this.car.updateCarRotation(angle);
    },

    // #endregion
  },
  mounted() {},
  beforeDestroy() {
    this.unRegisterBusEvent();
    this.clearAutoMoveTimer();
  },
};
</script>

<style scoped>
/* 默认的左右布局 */
.demo-1 {
  display: flex;
}

/* 移动设备视口时的上下布局 */
@media (max-width: 767px) {
  .demo-1 {
    display: block;
  }

  /* 右边部分（现在是下方）的样式调整 */
  .demo-1 > div {
    margin-left: 0;
    margin-top: 20px;
  }
}
</style>
