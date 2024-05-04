const LAYER = {
  BACK: "back",
  PATH: "path",
  DEFAULT: "default",
  FRONT: "front",
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
    [LAYER.FRONT]: 1000,
  },
  EVENT_LIST: {
    POINT_LABEL_VISIBLE: "POINT_LABEL_VISIBLE",
  },
};
