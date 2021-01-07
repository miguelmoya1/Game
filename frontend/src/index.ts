import { Mouse } from './Mouse';
import { info, fps } from './Content/Content';
import { Player } from './Player/Player';
import service from './roomService';

class Main {
  fps = 0;
  players: Player[] = [];
  room = service.room('game');
  mainPlayerID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );

  mainPlayer!: Player;

  constructor() {}

  async init() {
    this.mainPlayer = await new Player(this.mainPlayerID, true).init(
      '../assets/Pink_Monster/Pink_Monster.png'
    );
    this.players.push(this.mainPlayer);
    this.players.forEach((p, i) => p.setVar({ x: i * 20 }));
    this.setFPS();
    this.setMultiplayerAndDrawMap();
  }

  setMultiplayerAndDrawMap() {
    this.room.then((room) => {
      const map = room.map('players');
      room.subscribe(map, (obj) => {
        console.log(obj.players);
        obj.players.forEach((p: { id: string }) => {
          if (p.id !== this.mainPlayerID) {
            const found = this.players.findIndex((pl) => pl.id === p.id) !== -1;
            if (!found) {
              const newPlayer = new Player(p.id);
              newPlayer.init('../assets/Owlet_Monster/Owlet_Monster.png');
              this.players.push(newPlayer);
            }

            const player = this.players.find((pl) => pl.id === p.id);
            player.setVar({ ...p });
          }
        });
      });
      this.draw(map); // DRAW THE MAP
    });
  }

  async draw(map: any) {
    this.fps++;
    this.setInfo();
    this.players.forEach(async (p) => {
      p.move();
    });
    if (this.fps % 20 === 0) {
      map.set('players', this.players);
    }
    requestAnimationFrame(() => this.draw(map));
  }

  setInfo() {
    const textInnerInfo = `
    x: ${Mouse.x.toString().padStart(4, '0')}, y: 
    ${Mouse.y.toString().padStart(4, '0')} <br>
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
