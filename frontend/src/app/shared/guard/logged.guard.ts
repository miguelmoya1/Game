import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLogged implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async canActivate() {
    const logged = await this.authService.isLogged();
    if (!logged) {
      this.router.navigate(['/auth']);
    }
    return logged;
  }
}
