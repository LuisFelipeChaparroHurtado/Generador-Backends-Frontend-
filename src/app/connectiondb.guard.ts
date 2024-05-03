import { Injectable } from '@angular/core';
import { ConnectionDbService } from './services/connection-db.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConnectiondbGuard {
  constructor(
    private connectiondbService: ConnectionDbService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.connectiondbService.checkConnectionDb()) {
      return true;
    }
    this.router.navigate(['/private/dash/generator']);
    return false;
  }
}
