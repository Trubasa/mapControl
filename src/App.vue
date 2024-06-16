<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="使用介绍" name="first"></el-tab-pane>
        <el-tab-pane label="demo1" name="second"></el-tab-pane>
      </el-tabs>
    </div>

    <div v-show="activeName === 'first'">
      <DemoBase />
    </div>
    <div v-show="activeName === 'second'">
      <Demo1 />
    </div>
  </div>
</template>

<script>
import MapControl from "./components/map-control/map-control.vue";
import { fabricUtils } from "./components/map-control/modules/fabricUtils";
import { constant } from "./components/map-control/utils/constant";
import { utils } from "./components/map-control/utils/utils";
import Demo1 from "./components/demo-1/demo-1.vue";
import DemoBase from "./components/demo-base/demo-base.vue";
export default {
  components: { MapControl, Demo1, DemoBase },
  name: "app",
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(name) {
      // this.activeName = name;
    },
  },
  mounted() {},
  beforeDestroy() {
    this.unRegisterBusEvent();
  },
};
</script>

<style scoped></style>
