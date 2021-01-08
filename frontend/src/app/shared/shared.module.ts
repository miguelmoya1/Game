import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardMiniComponent } from './components/card-mini/card-mini.component';
import { MaterialModule } from './material/material.module';
import { IonicModule } from '@ionic/angular';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
  declarations: [CardComponent, CardMiniComponent, ScheduleComponent],
  exports: [CardComponent, CardMiniComponent, ScheduleComponent],
  imports: [CommonModule, MaterialModule, IonicModule.forRoot()],
})
export class SharedModule {}
