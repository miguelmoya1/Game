import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  path: string;

  constructor(protected route: Router, protected authService: AuthService) {}

  async ngOnInit() {
    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((r: NavigationEnd) => (this.path = r.url));
  }

  public logout() {
    this.authService.logout();
    this.route.navigate(['/auth/login']);
  }
}
