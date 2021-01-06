import { Mouse } from "./Mouse";
import { info, canvas, fps } from "./Content/Content";
import { Player } from "./Player/Player";

class Main {
  fps = 0;
  players: Player[] = [];

  constructor() {
    canvas.width = 928 * 2;
    canvas.height = 793;
  }

  async init() {
    this.players.push(
      await new Player().init("../assets/Pink_Monster/Pink_Monster.png")
    );
    this.setFPS();
    // setInterval(() => this.draw());
    this.draw();
  }

  draw() {
    this.fps++;
    this.setInfo();
    this.players.forEach((p) => p.draw());
    requestAnimationFrame(() => this.draw());
  }

  setInfo() {
    const textInnerInfo = `
    x: ${Mouse.x.toString().padStart(4, "0")}, y: 
    ${Mouse.y.toString().padStart(4, "0")} <br>
    `;
    if (info.innerHTML !== textInnerInfo) info.innerHTML = textInnerInfo;
  }

  setFPS() {
    fps.innerHTML = `fps: ${this.fps}`;
    setInterval(() => {
      fps.innerHTML = `fps: ${this.fps}`;
      this.fps = 0;
    }, 1000);
  }
}

const main = new Main();

main.init();
