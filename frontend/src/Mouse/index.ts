import { canvas } from '../Content/Content';

class _Mouse {
  x = 0;
  y = 0;

  constructor() {
    canvas.onmousemove = (e: any) => {
      this.x = e.layerX;
      this.y = e.layerY;
    };
  }
}

export const Mouse = new _Mouse();
