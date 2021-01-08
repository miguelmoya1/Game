import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-seeker',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('.2s')]),
      transition('closed => open', [animate('.2s')]),
    ]),
  ],
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss'],
})
export class SeekerComponent implements OnInit {
  hasHistory = false;
  searchBarOpen = true;

  search: string;
  cantGoBack = ['/', '/business', '/schedule', '/installation', '/profile'];

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd)
        this.hasHistory = !this.cantGoBack.includes(this.router.url);
    });
  }

  goBack() {
    this.location.back();
  }

  changeSearch() {
    this.search = undefined;
    this.searchBarOpen = !this.searchBarOpen;
  }
}
