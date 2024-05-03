import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MySession } from 'src/app/models/my-session';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  // Object to hold the current user's session data
  public objMySession: MySession;
  // Object to hold the current user's data
  public objUser: User;
  // Holds the user's unique identifier (e.g., ID or username)
  public codigito: string;

  constructor(
    public session: LoginService, // Inject LoginService for managing user sessions
    public userService: UserService, // Inject UserService for fetching user data
    private activateRoute: ActivatedRoute // Inject ActivatedRoute for accessing route parameters
  ) {
    // Initialize the User object with default values
    this.objUser = new User('', '', '', '', '', '', '', '');
    this.codigito = '';
    // Retrieve the current session data
    this.objMySession = session.getDataSession();
  }
  // Lifecycle hook called when the component is about to be destroyed
  ngOnDestroy(): void {}
  // Lifecycle hook called when the component is initialized
  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.activateRoute.paramMap.subscribe((params) => {
      // Get the user's ID from the session
      this.codigito = this.objMySession.id;
      // If the ID exists, fetch user data using the UserService
      if (this.codigito) {
        // Update the user data with the response
        this.userService.getUser(this.codigito).subscribe(
          (res) => {
            this.objUser = res;
            console.log(this.objUser);
          },
          (err) => console.log(err) // Handle any errors
        );
      }
    });
  }

  // Function to format date strings in a specific locale format
  formatDate(dateString: string): string {
    // Define date format options
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    // Return the formatted date string
    return date.toLocaleDateString('en-US', options);
  }
}
