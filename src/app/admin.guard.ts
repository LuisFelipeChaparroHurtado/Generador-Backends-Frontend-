import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.checkProfile()) {
      return true;
    }
    this.router.navigate(['/private/dash/profile']);
    return false;
  }
}
