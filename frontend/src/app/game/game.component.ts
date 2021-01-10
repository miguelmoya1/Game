import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { RsService } from '../rs.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public FPS = 0;
  public _fps = 0;

  @ViewChildren('player') player!: QueryList<PlayerComponent>;

  constructor(private rsService: RsService) {}

  async ngOnInit() {
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
