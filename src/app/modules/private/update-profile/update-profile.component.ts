import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Subscription } from 'rxjs';
import { MySession } from 'src/app/models/my-session';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  // Temporary variables
  private tmp: any;
  public tmpBase64: any;
  // User data
  public objUser: User;
  public miSuscripcion: Subscription;
  public idUser: string | null;
  public codigito: string;
  public confirmPassword: string = '';
  decryptedPassword: string = '';
  public modalRef: BsModalRef;
  edit: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public passwordCoincide: boolean = false;
  public passwordMatchError: boolean = false;
  public objMySession: MySession;

  // Constructor for dependency injection
  constructor(
    private router: Router,
    public userService: UserService,
    public toastr: ToastrService,
    public miModal: BsModalService,
    private activateRoute: ActivatedRoute,
    public session: LoginService
  ) {
    // Initialize user object with empty values
    this.objUser = new User('', '', '', '', '', '', '', '');
    this.miSuscripcion = this.tmp;
    this.codigito = '';
    // Retrieve user ID from route parameters
    this.idUser = this.activateRoute.snapshot.paramMap.get('idUser');
    this.modalRef = this.tmpBase64;
    // Retrieve current session data
    this.objMySession = session.getDataSession();
  }

  // Angular lifecycle hook: OnInit
  ngOnInit(): void {
    // Subscribe to route parameters to retrieve user ID
    this.activateRoute.paramMap.subscribe((params) => {
      this.codigito = String(params.get('idUser'));
      // Fetch user data if user ID is found
      if (this.codigito) {
        this.userService.getUser(this.codigito).subscribe(
          (res) => {
            // Check if the user ID matches the session ID
            if (this.codigito == this.objMySession.id) {
              this.objUser = res;
            } else {
              // Redirect to profile page if IDs don't match
              this.router.navigate(['/private/dash/profile']);
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

  // Method to select a photo and read its data
  public seleccionarFoto(objeto: any): any {
    let caja = objeto.target.files[0];
    if (!caja || caja.length == 0) {
      return;
    }
    if (caja.type.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(caja);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.objUser.name_photo = caja.name;
      this.objUser.base64_photo = this.tmpBase64;
    };
  }

  // Method to handle form operations and update the user
  public updateProfile(formulario: NgForm): void {
    // Check if the passwords match
    if (this.objUser.password_user !== this.confirmPassword) {
      mostrarMensaje('error', 'Passwords do not match', 'Error', this.toastr);
      this.passwordMatchError = true;
      return;
    }
    // Initialize user properties for update
    const idUser: string = this.objUser.id_user;
    const nameUser: string = this.objUser.full_name;
    const emailUser: string = this.objUser.email_user;
    const passwordUser: string = this.objUser.password_user;
    const namePhoto: string = this.objUser.name_photo;
    const base64Photo: string = this.objUser.base64_photo;
    const objNewUser = new User(
      idUser,
      nameUser,
      emailUser,
      passwordUser,
      '',
      namePhoto,
      base64Photo,
      ''
    );

    // Update user record and handle response
    this.miSuscripcion = this.userService
      .updateProfile(idUser, objNewUser)
      .pipe(
        map((resultado: any) => {
          // Navigate to profile and reload page after successful update
          this.router.navigate(['/private/dash/profile']).then(() => {
            window.location.reload();
          });
          // Show success message
          mostrarMensaje('success', 'Updated user', 'Success', this.toastr);

          return resultado;
        }),
        catchError((err) => {
          // Show error message in case of error
          mostrarMensaje('error', 'Existing user', 'Error', this.toastr);
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  // Method to toggle password visibility
  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Method to toggle confirm password visibility
  public toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
