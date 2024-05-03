import { Injectable } from '@angular/core';
import { ConnectionDbService } from './services/connection-db.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConnectionFormGuard {
  constructor(
    private connectiondbService: ConnectionDbService,
    private router: Router
  ) {}
  canActivate(): boolean {
    const tokenExists = this.connectiondbService.checkConnectionDb();

    if (tokenExists) {
      this.router.navigate(['/private/dash/template/projectMenu']);
      return true;
    } else {
      this.router.navigate(['/private/dash/generator']);
      return false;
    }
  }
}
