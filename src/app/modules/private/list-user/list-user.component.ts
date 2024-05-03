import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize, map, Subscription } from 'rxjs';
import { MySession } from 'src/app/models/my-session';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean; // Indicates whether the loading of data has finished
  public listUsers: User[]; // List of users
  public selectUser: User; // Selected user for deletion
  public subscription: Subscription; // Subscription to manage observables
  public modalRef: BsModalRef; // Reference to the modal for user deletion confirmation
  public modalTitle: string; // Title of the modal
  public modalBody: string; // Body text of the modal
  public modalContent: string; // Content of the modal
  public objMySession: MySession; // Object that holds information about the current session.
  public modal: any;

  constructor(
    private adminService: AdminService,
    public myModal: BsModalService,
    public tosatr: ToastrService,
    public session: LoginService, // Session management service.
  ) {
    // Initialize component variables
    this.listUsers = [];
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
    this.selectUser = this.startUser();
    this.modalRef = this.modal;
    this.modalTitle = '';
    this.modalBody = '';
    this.modalContent = '';
    this.objMySession = session.getDataSession(); // Retrieves the current session data.
  }
  ngOnInit(): void {
    // Fetch the list of users when the component is initialized
    this.getUsers();
  }
  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public startUser(): User {
    // Initialize a new user with empty properties
    return new User('', '', '', '', '', '', '', '');
  }
  public getUsers(): void {
    // Fetch the list of users from the admin service
    this.subscription = this.adminService
      .getListUsers()
      .pipe(
        map((answer: any) => {
          this.listUsers = answer; // Assign the list of users to the component's listUsers property
        }),
        finalize(() => {
          this.cargaFinalizada = true; // Indicate that the data loading has finished
        })
      )
      .subscribe(observadorAny);
  }
  public deleteUser(cod: string) {
    // Delete a user by their ID
    this.adminService.deleteUser(cod).subscribe(() => {
      // Filter the list of users to remove the deleted user
      this.listUsers = this.listUsers.filter((u) => u.id_user !== cod);
      // Show a success message using toastr
      mostrarMensaje(
        'success',
        'User successfully removed',
        'SUCCESSFUL',
        this.tosatr
      );
    });
  }
  public openModal(plantilla: TemplateRef<any>, objUser: User): void {
    // Open a modal for user deletion confirmation
    this.selectUser = objUser; // Set the selected user
    this.modalRef = this.myModal.show(plantilla, { class: 'modal-md' });
    this.modalTitle = 'Warning'; // Set the modal title
    this.modalBody = 'Do you really want to eliminate the user?'; // Set the modal body text
    this.modalContent = objUser.full_name; // Set the modal content text
  }
  public btnCancel(): void {
    // Close the modal
    this.modalRef.hide();
  }
  public btnDelete(): void {
    // Delete the selected user and close the modal
    this.deleteUser(this.selectUser.id_user);
    this.btnCancel();
  }

  formatDate(dateString: string): string {
    // Format a date string to a more readable format
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
}
