import { Injectable } from '@angular/core';
import RoomService from '@roomservice/browser';

@Injectable({
  providedIn: 'root',
})
export class RoomServiceService {
  private roomService: RoomService<object>;

  constructor() {
    this.roomService = new RoomService({
      auth: 'authCheck',
    });
  }

  // async authCheck({ room }: any) {
  //   const response = await fetch('http://localhost:8080/api/roomservice', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       room,
  //     }),
  //   });

  //   if (response.status === 401) {
  //     throw new Error('Unauthorized!');
  //   }

  //   const body = await response.json();
  //   return body;
  // }

  public room(room: string) {
    return this.roomService.room(room);
  }
}
