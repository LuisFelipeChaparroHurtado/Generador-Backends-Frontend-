import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root',
})
export class VigilanteGuard {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(): boolean {
    if (this.loginService.checkUser()) {
      return true;
    }
    this.router.navigate(['/land/login']);
    return false;
  }
}
