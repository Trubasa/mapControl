/**
 * Created by Trubasa 1141521502@qq.com on 2018/6/26.
 */
import mapControl from "../components/map-control/map-control.vue";

const imgSort = {
  install(Vue, options) {
    Vue.component(mapControl.name, mapControl);
  },
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(imgSort);
}

export default imgSort;
