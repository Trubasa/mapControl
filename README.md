# map-control

基于 vue2 封装 fabricjs 的组件

## npm 包方式使用

安装依赖

```
npm install map-control
```

在 main.js 中注册

```
import mapControl from "map-control";
Vue.use(mapControl);
```

在 vue 文件中使用

```
<map-control></map-control>
```

## 复制源码使用

将项目中的 components/map-control 拷贝到 vue2 项目中

引入 map-control.vue 进行使用，其中的引入路径请根据实际情况调整

```
import MapControl from "./components/map-control/map-control.vue";
export default {
  components: { MapControl },
}
```

## 开发

```bash
# 安装依赖
npm install

# 开发
npm run dev

# 打包
npm run build

# 发布
npm public
```

## 开发说明

本项目核心逻辑存在 components/map-control/modules 中

- ElcCanvas 封装 fabricjs 与创建画布的主类
- BaseElcNode 画布内节点的基类
- BaseComponent 逻辑插件的基类
- fabricUtils 一些工具方法
- （各类继承 BaseElecNode 的子类，特征为 Elc 开头，例如：ElcImage）
- （各类继承 BaseComponent 的逻辑插件，特征为 Component 结尾，例如：MovableComponent、MouseZoomComponent）

## 相关资料

- [fabric 中文教程](https://k21vin.gitee.io/fabric-js-doc/articles/quickstart.html)
- [fabric 案例 demo](https://gitee.com/k21vin/fabricjs-demo#https://gitee.com/k21vin/fabricjs-demo/blob/master/tutorial/Canvas/controlsAboveOverlay.html)

## tips

- 使用 fabric.Group 设置分组后，便如法单独编辑该分组下的元素
