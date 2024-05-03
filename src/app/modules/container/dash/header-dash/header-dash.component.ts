import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MySession } from 'src/app/models/my-session';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-dash',
  templateUrl: './header-dash.component.html',
  styleUrls: ['./header-dash.component.css'],
})
export class HeaderDashComponent {
  public objMySession: MySession; // Object that holds information about the current session.
  public objUser: User; // User object that holds information about the user.
  public codigito: string; // String that holds the ID of the user (called "codigito").

  constructor(
    public session: LoginService, // Session management service.
    public userService: UserService, // Service for handling users.
    private activateRoute: ActivatedRoute // To access route parameters.
  ) {
    this.objUser = new User('', '', '', '', '', '', '', ''); // Initializes an empty User object.
    this.codigito = ''; // Initializes the user ID with an empty string.

    this.objMySession = session.getDataSession(); // Retrieves the current session data.
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    // Subscribes to the route parameters.
    this.activateRoute.paramMap.subscribe((params) => {
      // Assigns the current session ID to the "codigito" variable.
      this.codigito = this.objMySession.id;

      // Checks if there is a session ID.
      if (this.codigito) {
        // Calls the service to get the user by ID.
        this.userService.getUser(this.codigito).subscribe(
          (res) => {
            // Assigns the response to the User object.
            this.objUser = res;
          },
          (err) => console.log(err) // Logs any errors to the console.
        );
      }
    });
  }

  // Property to control whether the menu is open or closed.
  isMenuOpen: boolean = false;

  // Method to toggle the menu state.
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Method to toggle full-screen mode.
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}