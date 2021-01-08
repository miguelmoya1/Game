class _Mouse {
  x = 0;
  y = 0;

  constructor() {
    document.onmousemove = (e: any) => {
      this.x = e.layerX;
      this.y = e.layerY;
    };
  }
}

export const Mouse = new _Mouse();
