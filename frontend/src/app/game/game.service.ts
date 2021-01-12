import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public joinRoom$: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient) {}

  public getRoomID() {
    return this.httpClient.get('/game/join').toPromise();
  }

  public hasRoom() {
    return new Promise((r) => r(false));
  }

  public setRoomID(roomID: string) {
    localStorage.setItem('roomID', roomID);
  }

  public joinRoom(roomID: string) {
    return this.httpClient
      .post<{ room: string; userID: string }>('/game/join', { room: roomID })
      .pipe(tap((e) => this.joinRoom$.emit(true)))
      .toPromise();
  }

  public createRoom() {
    return;
  }
}
