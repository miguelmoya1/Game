import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { RsService } from '../rs.service';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public FPS = 0;
  public _fps = 0;
  public hasRoom = false;
  public roomID!: string;

  @ViewChildren('player') player!: QueryList<PlayerComponent>;

  constructor(private rsService: RsService, private gameService: GameService) {}

  async ngOnInit() {
    this.gameService.joinRoom$.subscribe((hasRoom: boolean) => {
      this.roomID = this.gameService.getRoomID()!;
      this.hasRoom = hasRoom;
      this.setGame();
    });
  }

  private async setGame() {
    this.runGame();
    this.setFPS();
    this.gameService.getPlayers(this.roomID);
    const map = (await this.rsService.getRoom(this.roomID)).map('players');
    (await this.rsService.getRoom('game')).subscribe(map, (a) => {
      console.log(a);
    });
  }

  private async runGame() {
    this._fps++;
    this.player.forEach((p) => p.move());
    requestAnimationFrame(() => this.runGame());
  }

  private setFPS() {
    setInterval(() => {
      this.FPS = this._fps;
      this._fps = 0;
    }, 1000);
  }
}
