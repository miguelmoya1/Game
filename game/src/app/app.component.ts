import { Component, OnInit } from '@angular/core';
import { RoomClient } from '@roomservice/browser';
import { RsService } from './rs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'game';
  room!: RoomClient;
  constructor(private rsService: RsService) {}

  async ngOnInit() {
    this.room = await this.rsService.service.room('game');
    const map = this.room.map('players');
    this.room.subscribe(map, (a) => {
      console.log(a);
    });
  }
}
