import { Component, Input, OnInit } from '@angular/core';
import { IInstallation } from '../../../../../../global';

@Component({
  selector: 'app-card-mini',
  templateUrl: './card-mini.component.html',
  styleUrls: ['./card-mini.component.scss'],
})
export class CardMiniComponent implements OnInit {
  @Input() item: IInstallation;

  constructor() {}

  ngOnInit() {}
}
