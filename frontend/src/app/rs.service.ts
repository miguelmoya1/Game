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
      auth: ({ room }: any) =>
        this.httpClient
          .post<AuthResponse>('http://localhost:3000/user/room', room)
          .toPromise(),
      ctx: {},
    });

    console.log(this.service);
  }
}
