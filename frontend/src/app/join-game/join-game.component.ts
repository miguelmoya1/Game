import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
