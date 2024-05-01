export const useFabricManager = () => {
  let fabricManager = {
    fCanvas: null, // fabric.Canvas实例
    init(canvasDom) {
      this.fCanvas = new fabric.Canvas(canvasDom);
    },
  };

  return fabricManager;
};
