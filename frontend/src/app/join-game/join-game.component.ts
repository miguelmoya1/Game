import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  public isLogged = false;
  public roomID = localStorage.getItem('roomID');
  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {}

  async ngOnInit() {
    this.authService.logged$.subscribe((l: boolean) => (this.isLogged = l));
    await this.authService.isLogged();
  }

  async joinGames() {
    await this.gameService.joinRoom('ROOM_DB');
  }
}
