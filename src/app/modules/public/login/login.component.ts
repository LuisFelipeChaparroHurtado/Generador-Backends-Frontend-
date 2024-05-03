import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

import * as sha512 from 'js-sha512';
import { ResponseLogin } from 'src/app/models/response-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private tmp: any;
  public objUser: Login; // The Login object that stores user input.
  public mySuscription: Subscription; // Subscription object for handling observables.
  public emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'; // Regular expression pattern for validating email addresses.
  constructor(
    private router: Router,
    public accessService: LoginService,
    public toastr: ToastrService
  ) {
    // Initialize the user object with empty fields.
    this.objUser = new Login('', '');
    this.mySuscription = this.tmp;
  }

  // Component initialization lifecycle hook.
  ngOnInit(): void {}
  // Component destruction lifecycle hook.
  ngOnDestroy(): void {
    // Unsubscribe from any active subscriptions to avoid memory leaks.
    if (this.mySuscription) {
      this.mySuscription.unsubscribe();
    }
  }

  // Method to handle the login form submission.
  public operation(form: NgForm): void {
    // Hash the user's password using SHA-512.
    const myHash = sha512.sha512(this.objUser.passwordUser);
    const pasw = this.objUser.passwordUser;
    const email: any = this.objUser.emailUser;
    // Create a Login object with the provided email and password.
    const objLogin = new Login(email, pasw);
    // Make a login request using the access service.
    this.mySuscription = this.accessService
      .login(objLogin)
      .pipe(
        // Process the response and handle navigation and messaging.
        map((result: ResponseLogin) => {
          // Store the token in local storage.
          localStorage.setItem('tokenGenBack', result.tokenGenBack);
          // Navigate to the private dashboard.
          this.router.navigate(['/private/dash']);
          // Display a success message.
          mostrarMensaje(
            'success',
            'Welcome to the system',
            'Success',
            this.toastr
          );
          // Reset the form.
          form.reset();
          return result;
        }),
        // Handle errors during the login process.
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Incorrect authentication',
            'Error',
            this.toastr
          );
          // Reset the form.
          form.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
