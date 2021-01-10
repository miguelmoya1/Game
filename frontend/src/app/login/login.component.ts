import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('miguel@finald.app', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('1234', [Validators.required]),
    });
  }

  async login() {
    if (this.form.valid) {
      const auth = this.form.getRawValue();
      await this.authService.login(auth);
    }
  }
}
