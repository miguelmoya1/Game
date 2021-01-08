import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotLogged implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate() {
    const logged = await this.authService.isLogged();
    if (!logged) {
      return true;
    }
  }
}
