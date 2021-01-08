import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomService } from '@roomservice/browser';
import { AuthResponse } from '@roomservice/browser/dist/types';

@Injectable({
  providedIn: 'root',
})
export class RsService {
  public service: RoomService<any>;

  constructor(private httpClient: HttpClient) {
    this.service = new RoomService({
      auth: ({ room }: any) => {
        console.log(room);
        return this.httpClient
          .post<AuthResponse>('/user/join', { room })
          .toPromise();
      },

      ctx: {},
    });
  }
}
