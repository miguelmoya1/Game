import { Mouse } from "./Mouse";
import { info, canvas, fps } from "./Content/Content";
import { Player } from "./Player/Player";
import service from "./roomService";

class Main {
  fps = 0;
  players: Player[] = [];
  room = service.room("game");

  constructor() {
    canvas.width = 928 * 2;
    canvas.height = 793;
  }

  async init() {
    this.players.push(
      await new Player({}).init("../assets/Pink_Monster/Pink_Monster.png")
    );
    this.setFPS();
    this.room.then((room) => {
      const map = room.map("players");
      room.subscribe(map, (obj) => {
        this.players = obj.players.map((p) => {
          const pl = new Player({ ...p });
          if (!pl.isInit()) pl.init("../assets/Pink_Monster/Pink_Monster.png");
          return pl;
        });
        console.log(this.players);
      });
      this.draw(map);
    });
  }

  async draw(map: any) {
    this.fps++;
    this.setInfo();
    this.players.forEach(async (p) => {
      p.draw();
    });
    if (this.fps % 5 === 0) {
      map.set("players", this.players);
    }
    requestAnimationFrame(() => this.draw(map));
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
