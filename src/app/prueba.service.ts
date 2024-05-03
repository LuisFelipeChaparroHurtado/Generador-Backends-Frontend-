import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PruebaService {
  private isMenuOpen = true;

  constructor() {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getMenuState() {
    return this.isMenuOpen;
  }
}
