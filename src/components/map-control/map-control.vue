<template>
  <div class="map-control">
    <canvas
      ref="container"
      :style="customStyle"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";
import { fabricUtils } from "./modules/fabricUtils.js";
import { ElcCanvas } from "./modules/ElcCanvas.js";
export default {
  name: "map-control",
  components: {},
  props: {
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 600,
    },
    customStyle: {
      type: Object,
      default: () => ({
        border: "1px solid #000",
      }),
    },
    zoomable: {
      type: Boolean,
      default: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    movable: {
      type: Boolean,
      default: true,
    },
    isShowPointText: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      elcCanvas: null,
    };
  },
  watch: {
    zoomable: {
      handler(val) {
        this.setZoomable(val);
      },
      immediate: true,
    },
    editable: {
      handler(val) {
        this.setEditable(val);
      },
      immediate: true,
    },
    movable: {
      handler(val) {
        this.setMovable(val);
      },
      immediate: true,
    },
    isShowPointText: {
      handler(val) {
        this.setPointTextVisable(val);
      },
      immediate: true,
    },
  },
  computed: {},
  methods: {
    setZoomable(val) {
      if (this.elcCanvas) {
        this.elcCanvas.mouseZoomComponent.enable = val;
      }
    },
    setEditable(val) {
      if (this.elcCanvas) {
        this.elcCanvas.editableComponent.enable = val;
      }
    },
    setMovable(val) {
      if (this.elcCanvas) {
        this.elcCanvas.movableComponent.enable = val;
      }
    },
    setPointTextVisable(val) {
      if (this.elcCanvas) {
        this.elcCanvas.pointLabelVisableComponent.enable = val;
      }
    },
  },
  created() {},
  mounted() {
    this.elcCanvas = new ElcCanvas(this.$refs.container);
    this.setZoomable(this.zoomable);
    this.setEditable(this.editable);
    this.setMovable(this.movable);
    this.setPointTextVisable(this.isShowPointText);
    this.$emit("ready");
  },
  beforeDestroy() {
    if (this.elcCanvas) {
      this.elcCanvas.destroy();
    }
  },
};
</script>
<style scoped>
.map-control {
}
</style>
