import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { PlayerComponent } from '../player/player.component';
import { GameRouterModule } from './game-routing.module';
import { JoinGameModule } from '../join-game/join-game.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [GameComponent, PlayerComponent],
  imports: [CommonModule, GameRouterModule, JoinGameModule, MatCardModule],
})
export class GameModule {}
