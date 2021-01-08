import { Component, Input } from '@angular/core';
import { IBusiness, IInstallation } from '../../../../../../global';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() item: (IBusiness & { icon: string }) | IInstallation;

  constructor() {}
}
