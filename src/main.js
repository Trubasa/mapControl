import Vue from "vue";
import App from "./App.vue";

import mapControl from "../dist/map-control.js";

Vue.use(mapControl);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
