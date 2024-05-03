import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Subscription } from 'rxjs';
import { MySession } from 'src/app/models/my-session';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-update-admin-user',
  templateUrl: './update-admin-user.component.html',
  styleUrls: ['./update-admin-user.component.css'],
})
export class UpdateAdminUserComponent implements OnInit, OnDestroy {
  // Temporary variables
  private tmp: any;
  public tmpBase64: any;
  // User data
  public objUser: User;
  public miSuscripcion: Subscription;
  public idUser: string | null;
  public codigito: string;
  public confirmPassword: string = '';
  public modalRef: BsModalRef;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public passwordCoincide: boolean = false;
  public passwordMatchError: boolean = false;
  public objMySession: MySession;

  // Constructor for dependency injection
  constructor(
    private router: Router,
    public adminService: AdminService,
    public toastr: ToastrService,
    public miModal: BsModalService,
    private activateRoute: ActivatedRoute,
    public session: LoginService
  ) {
    // Initial user object with empty values
    this.objUser = new User('', '', '', '', '', '', '', '');
    this.miSuscripcion = this.tmp;
    this.codigito = '';
    // Get the user ID from route parameters
    this.idUser = this.activateRoute.snapshot.paramMap.get('idUser');
    this.modalRef = this.tmpBase64;
    // Get the current session data
    this.objMySession = session.getDataSession();
  }

  // Angular lifecycle hook: OnInit
  ngOnInit(): void {
    // Subscribe to route parameters to get user ID
    this.activateRoute.paramMap.subscribe((params) => {
      this.codigito = String(params.get('idUser'));
      // If user ID is found, fetch user data
      if (this.codigito) {
        this.adminService.getFindUser(this.codigito).subscribe(
          (res) => {
            // Check if the user profile is admin (profile 2)
            if (res.profile == '2') {
              this.objUser = res;
            } else {
              // Navigate to user list if not admin
              this.router.navigate(['/private/dash/listUser']);
            }
          },
          (err) => console.log(err)
        );
      }
    });
  }

  // Angular lifecycle hook: OnDestroy
  ngOnDestroy(): void {
    // Unsubscribe from the subscription if it exists
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  // Form operations method to handle user update
  public operaciones(formulario: NgForm): void {
    // Check if passwords match
    if (this.objUser.password_user !== this.confirmPassword) {
      mostrarMensaje('error', 'Passwords do not match', 'Error', this.toastr);
      this.passwordMatchError = true;
      return;
    }
    // Create a new User object with updated values
    const idUser: string = this.objUser.id_user;
    const nameUser: string = this.objUser.full_name;
    const emailUser: string = this.objUser.email_user;
    const passwordUser: string = this.objUser.password_user;
    const profile: string = this.objUser.profile;
    const objNewUser = new User(
      idUser,
      nameUser,
      emailUser,
      passwordUser,
      '',
      '',
      '',
      profile
    );

    // Subscription to updateUser service
    this.miSuscripcion = this.adminService
      .updateUser(idUser, objNewUser)
      .pipe(
        map((resultado: any) => {
          // Navigate to user list after successful update
          this.router.navigate(['/private/dash/listUser']);
          // Show success message
          mostrarMensaje(
            'success',
            'User successfully updated',
            'SUCCESSFUL',
            this.toastr
          );
          return resultado;
        }),
        catchError((err) => {
          // Show error message in case of error
          mostrarMensaje(
            'error',
            'Existing user in the database',
            'Error',
            this.toastr
          );
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  // Method to toggle the visibility of the password field
  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  // Method to toggle the visibility of the confirm password field
  public toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
