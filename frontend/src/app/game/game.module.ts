import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { PlayerComponent } from '../player/player.component';
import { GameRouterModule } from './game-routing.module';

@NgModule({
  declarations: [GameComponent, PlayerComponent],
  imports: [CommonModule, GameRouterModule],
})
export class GameModule {}
