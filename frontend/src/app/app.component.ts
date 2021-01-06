import { Component, OnInit } from '@angular/core';
import { RoomClient } from '@roomservice/browser';
import { RoomServiceService } from './room-service/room-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Game';
  public room?: RoomClient;
  public list?: any;

  constructor(private roomService: RoomServiceService) {}

  async ngOnInit() {
    this.room = await this.roomService.room('room');

    this.list = this.room?.list('players');
    this.list?.push('cat', 'two', 'three');

    this.room.subscribe(this.list, (something) => {
      console.log(something);
    });
  }
}
