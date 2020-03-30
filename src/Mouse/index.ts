import { canvas } from '../Content';

class _Mouse {
  x = 0;
  y = 0;

  constructor() {
    canvas.onmousemove = (e) => {
      this.x = e.x;
      this.y = e.y;
    };
  }
}

export const Mouse = new _Mouse();
