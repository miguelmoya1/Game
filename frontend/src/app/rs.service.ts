import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomClient, RoomService } from '@roomservice/browser';
import { AuthResponse } from '@roomservice/browser/dist/types';

@Injectable({
  providedIn: 'root',
})
export class RsService {
  private service: RoomService<any>;
  private room: { [key: string]: RoomClient } = {};

  constructor(private httpClient: HttpClient) {
    this.service = new RoomService({
      ctx: {},
      auth: ({ room }: any) => {
        return this.httpClient
          .post<AuthResponse>('/game/join', { room })
          .toPromise();
      },
    });
  }

  public async getRoom(roomName: string) {
    if (!this.room[roomName]) {
      this.room[roomName] = await this.service.room(roomName);
    }
    return this.room[roomName];
  }

  public emitMove(player: any) {}
}
