<template>
  <div id="app">
    <map-control></map-control>
  </div>
</template>

<script>
import MapControl from "./components/map-control/map-control.vue";
export default {
  components: { MapControl },
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style></style>
