import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-create-admin-user',
  templateUrl: './create-admin-user.component.html',
  styleUrls: ['./create-admin-user.component.css'],
})
export class CreateAdminUserComponent implements OnInit, OnDestroy {
  // Temporary variables that may be used elsewhere in the component.
  private tmp: any;
  public tmpBase64: any;
  // User object to hold form data and operations related to user creation.
  public objUser: User;
  // Subscription object for managing subscriptions in the component.
  public miSuscripcion: Subscription;
  // Variable to hold and compare the confirmation password.
  public confirmPassword: string = '';
  // Variables for modal references and password visibility toggles.
  public modalRef: BsModalRef;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  // Flags for password match and error handling.
  public passwordCoincide: boolean = false;
  public passwordMatchError: boolean = false;

  constructor(
    private router: Router,
    public adminService: AdminService,
    public toastr: ToastrService,
    public miModal: BsModalService
  ) {
    this.objUser = new User('', '', '', '', '', '', '', ''); // Initialize a new User object with empty strings for all properties.
    // Assign temporary variables to the subscription and modal reference.
    this.miSuscripcion = this.tmp;
    this.modalRef = this.tmpBase64;
  }

  // Lifecycle hook that runs when the component initializes.
  ngOnInit(): void {}
  // Lifecycle hook that runs when the component is destroyed.
  // Unsubscribes any active subscriptions to prevent memory leaks.
  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  /**
   * Function to handle form submission and user creation.
   * @param form - The form object containing user input data.
   */
  public createUser(formulario: NgForm): void {
    // Check if the passwords match; if not, display an error message and exit.
    if (this.objUser.password_user !== this.confirmPassword) {
      mostrarMensaje('error', 'Passwords do not match', 'Error', this.toastr);
      this.passwordMatchError = true;
      return;
    }
    // Extract user details from the form and create a new User object.
    const nameUser: string = this.objUser.full_name;
    const emailUser: string = this.objUser.email_user;
    const passwordUser: string = this.objUser.password_user;
    const profile: string = this.objUser.profile;
    const objNewUser = new User(
      '',
      nameUser,
      emailUser,
      passwordUser,
      '',
      '',
      '',
      profile
    );
    // Subscribe to the admin service's createUser method to create a new user.
    this.miSuscripcion = this.adminService
      .createUser(objNewUser)
      .pipe(
        map((resultado: any) => {
          // Navigate to the user list page and display a success message.
          this.router.navigate(['/private/dash/listUser']);
          mostrarMensaje(
            'success',
            'User successfully created',
            'Success',
            this.toastr
          );
          // Reset the form after successful user creation.
          formulario.reset();
          return resultado;
        }),
        catchError((err) => {
          // Display an error message if user creation fails.
          mostrarMensaje(
            'error',
            'Existing user in the database',
            'Error',
            this.toastr
          );
          // Reset the form and rethrow the error.
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
  // Toggle the visibility of the password input field.
  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  // Toggle the visibility of the confirm password input field.
  public toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
