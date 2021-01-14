import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IGame, IUser } from '../../../../global';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public joinRoom$: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient) {}

  public setRoomID(roomID: string) {
    localStorage.setItem('roomID', roomID);
  }

  public getRoomID() {
    return localStorage.getItem('roomID');
  }

  public getPlayers(code: string) {
    return this.httpClient.get<IUser[]>(`/game/players/${code}`).toPromise();
  }

  public getGame(game: IGame) {
    return this.httpClient
      .post<IGame>('/game', game)
      .pipe(
        tap((r) => {
          this.setRoomID(r.password!);
          this.joinRoom$.emit(true);
        })
      )
      .toPromise();
  }
}
