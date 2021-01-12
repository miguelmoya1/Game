import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinGameComponent } from './join-game.component';
import { LoginModule } from '../login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [JoinGameComponent],
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [JoinGameComponent],
})
export class JoinGameModule {}
