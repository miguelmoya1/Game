import { canvas } from '../Content';

class _Mouse {
  x = 0;
  y = 0;
  pos = { x: 0, y: 0 };

  constructor() {
    canvas.onmousemove = (e) => {
      this.pos = this.getMousePos(e);
      this.x = e.x;
      this.y = e.y;
    };
  }

  private getMousePos = (e: MouseEvent) => {
    var rect = canvas.getBoundingClientRect();

    /// as mouse event coords are relative to document you need to
    /// subtract the element's left and top position:
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
}

export const Mouse = new _Mouse();
