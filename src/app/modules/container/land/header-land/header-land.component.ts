import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-land',
  templateUrl: './header-land.component.html',
  styleUrls: ['./header-land.component.css'],
})
export class HeaderLandComponent {
  // Property to track whether the menu is open or closed
  isMenuOpen: boolean = false;

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {}
  // Lifecycle hook that runs when the component is destroyed
  ngOnDestroy(): void {}

  // Method to toggle the state of isMenuOpen (open or close the menu)
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
