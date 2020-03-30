import { Mouse } from './Mouse';
import { Screen } from './Screen';
import { info, canvas } from './Content';

class Main {
  constructor() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  init() {
    let fps = 0;
    let date = new Date();
    setInterval(() => {
      fps++;
      this.setInfo();
    }, 100);
    Screen.setBackground();
  }

  setInfo() {
    const textInnerInfo = `
      x: ${Mouse.x.toString().padStart(4, '0')}, y: ${Mouse.y.toString().padStart(4, '0')} <br>
    `;
    if (info.innerHTML !== textInnerInfo)
      info.innerHTML = textInnerInfo;
  }
}

const main = new Main();

main.init();