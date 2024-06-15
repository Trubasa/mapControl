const LAYER = {
  BACK: "back",
  PATH: "path",
  DEFAULT: "default",
  FRONT: "front",
  CAR: "car",
};

export const constant = {
  ERROR_TYPE: {
    SUBCLASSES_DO_NOT_IMPLEMENT_CORRESPONDING_METHODS: "子类没有实现对应的方法",
  },
  KEYBOARD_KEY: {
    SPACE: " ",
  },
  Layer: LAYER,
  LAYER_VALUE: {
    [LAYER.BACK]: 0,
    [LAYER.PATH]: 100,
    [LAYER.DEFAULT]: 200,
    [LAYER.CAR]: 300,
    [LAYER.FRONT]: 1000,
  },
  EVENT_LIST: {
    POINT_LABEL_VISIBLE: "POINT_LABEL_VISIBLE",
    OBJECT_MODIFIED: "OBJECT_MODIFIED", // fabricjs对象编辑结束
    ZOOM_FINISH: "ZOOM_FINISH", // 缩放结束
  },
};
