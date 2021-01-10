import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinGameComponent } from './join-game.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [JoinGameComponent],
  imports: [CommonModule, LoginModule],
  exports: [JoinGameComponent],
})
export class JoinGameModule {}
