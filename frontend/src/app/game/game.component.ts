import { Component, OnInit } from '@angular/core';
import { RoomClient } from '@roomservice/browser';
import { RsService } from '../rs.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public room!: RoomClient;

  constructor(private rsService: RsService) {}

  async ngOnInit() {
    this.room = await this.rsService.service.room('game');
    const map = this.room.map('players');
    this.room.subscribe(map, (a) => {
      console.log(a);
    });
  }
}
