import { Injectable } from '@angular/core';
import { RoomService } from '@roomservice/browser';

@Injectable({
  providedIn: 'root',
})
export class RsService {
  public service: any;

  constructor() {
    this.service = new RoomService({
      auth: this.authCheck,
      ctx: {},
    });

    console.log(this.service);
  }

  public async authCheck({ room }: any) {
    const response = await fetch('http://localhost:3000/api/roomservice', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room,
      }),
    });

    if (response.status === 401) {
      throw new Error('Unauthorized!');
    }

    return await response.json();
  }
}
