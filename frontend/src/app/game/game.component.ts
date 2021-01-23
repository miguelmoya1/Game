import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RoomClient } from '@roomservice/browser';
import { MapClient } from 'RoomClient';
import { IUser } from '../../../../global';
import { PlayerComponent } from '../player/player.component';
import { RsService } from '../shared/services/rs.service';
import { UserService } from '../shared/services/user.service';
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

  public users!: IUser[];
  public user!: IUser;

  private room!: RoomClient;
  private map!: MapClient<any>;

  @ViewChild('player') player!: PlayerComponent;
  @ViewChildren('players') players!: QueryList<PlayerComponent>;

  constructor(
    private rsService: RsService,
    private gameService: GameService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.gameService.joinRoom$.subscribe((hasRoom: boolean) => {
      this.hasRoom = hasRoom;
      this.setGame();
    });
    this.gameService.checkJoined();
  }

  private async setGame() {
    this.setFPS();
    this.user = await this.userService.getMyUser();
    this.roomID = this.gameService.getRoomID()!;

    this.setUsersInRoom();
    this.room = await this.rsService.getRoom(this.roomID);
    this.map = this.room.map('players');

    await this.getMovePlayers();

    this.runGame();
  }

  private async runGame() {
    this._fps++;
    if (this.player?.move()) {
      this.map.set(this.user.id, this.player.getPosition());
    }
    requestAnimationFrame(() => this.runGame());
  }

  private setFPS() {
    setInterval(() => {
      this.FPS = this._fps;
      this._fps = 0;
    }, 1000);
  }

  private async getMovePlayers() {
    const map = this.room.map<any>('players');
    this.room.subscribe(map, (players) => {
      Object.keys(players).forEach((playerID) => {
        const user = this.users.find((user) => user.id === playerID);
        if (user) {
          this.players
            .find((p) => p.id === playerID)
            ?.setPosition(players[playerID]);
        }
      });
    });
  }

  private async setUsersInRoom() {
    this.users = await this.gameService.getPlayers(this.roomID);
  }
}
