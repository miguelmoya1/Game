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

  @ViewChildren('player') player!: QueryList<PlayerComponent>;
  public hasRoom = false;

  constructor(private rsService: RsService, private gameService: GameService) {}

  async ngOnInit() {
    this.gameService.joinRoom$.subscribe(
      (hasRoom: boolean) => (this.hasRoom = hasRoom)
    );
    const map = (await this.rsService.getRoom('game')).map('players');
    (await this.rsService.getRoom('game')).subscribe(map, (a) => {
      console.log(a);
    });
    this.runGame();
    this.setFPS();
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
