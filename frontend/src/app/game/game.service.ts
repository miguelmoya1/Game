import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IGame } from '../../../../global';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public joinRoom$: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient) {}

  public setRoomID(roomID: string) {
    localStorage.setItem('roomID', roomID);
  }

  public getRoomID() {}

  public getGame(game: IGame) {
    return this.httpClient
      .post<{ room: string; userID: string; password: string }>('/game', game)
      .pipe(
        tap((r) => {
          this.setRoomID(r.password);
          this.joinRoom$.emit(true);
        })
      )
      .toPromise();
  }
}
