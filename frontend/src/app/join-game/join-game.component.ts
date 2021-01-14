import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {
    this.form = new FormGroup({
      password: new FormControl('123456', [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  async ngOnInit() {
    this.authService.logged$.subscribe((l: boolean) => (this.isLogged = l));
    await this.authService.isLogged();
  }

  async joinGames() {
    if (this.form.valid) {
      await this.gameService.getGame({
        password: this.form.getRawValue().password,
      });
    } else {
      alert('CODE REQUIRED');
    }
  }

  async createGame() {
    await this.gameService.getGame({ private: false });
  }
}
