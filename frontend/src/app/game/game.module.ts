import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { PlayerComponent } from '../player/player.component';
import { GameRouterModule } from './game-routing.module';
import { JoinGameModule } from '../join-game/join-game.module';

@NgModule({
  declarations: [GameComponent, PlayerComponent],
  imports: [CommonModule, GameRouterModule, JoinGameModule],
})
export class GameModule {}
