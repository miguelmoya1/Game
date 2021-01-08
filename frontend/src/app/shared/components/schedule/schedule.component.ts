import { Component, Input, OnInit } from '@angular/core';
import { ISchedule } from '../../../../../../global';

@Component({
  selector: 'app-schedule-mini',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @Input() schedules: ISchedule[];
  constructor() {}

  ngOnInit() {}
}
