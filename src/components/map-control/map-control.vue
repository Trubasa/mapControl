<template>
  <div class="map-control">
    <slot> this is slot </slot>
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
  },
  created() {},
  mounted() {
    this.elcCanvas = new ElcCanvas(this.$refs.container);
    this.setZoomable(this.zoomable);
    this.setEditable(this.editable);
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
