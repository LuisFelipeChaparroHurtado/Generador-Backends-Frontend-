import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Connection } from 'src/app/models/connection';
import { ResponseConnectionDb } from 'src/app/models/response-connection-db';
import { ConnectionDbService } from 'src/app/services/connection-db.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
})
export class GeneratorComponent implements OnInit, OnDestroy {
  // Temporary variables
  private tmp: any;
  // Holds the connection object
  public objConnection: Connection;
  // Subscription to handle observables
  public mySuscription: Subscription;
  constructor(
    private router: Router, // Router service for navigation
    public connectionDbService: ConnectionDbService, // Service to test database connection
    public toastr: ToastrService // Toastr service for notifications
  ) {
    // Initialize the connection object
    this.objConnection = new Connection('', '', '', '', '');
    this.mySuscription = this.tmp;
  }
  // Component initialization lifecycle hook
  ngOnInit(): void {}
  // Component destruction lifecycle hook to handle cleanup
  ngOnDestroy(): void {
    // Unsubscribe the subscription if it exists
    if (this.mySuscription) {
      this.mySuscription.unsubscribe();
    }
  }

  // Function to test database connection using the form data
  public testConnectionDb(form: NgForm): void {
    // Destructure the connection properties
    const user = this.objConnection.user;
    const host = this.objConnection.host;
    const database = this.objConnection.database;
    const password = this.objConnection.password;
    const port = this.objConnection.port;

    // Create a new connection object with the form data
    const objConnection = new Connection(user, host, database, password, port);

    // Subscribe to the testConnection observable
    this.mySuscription = this.connectionDbService
      .testConnection(objConnection)
      .pipe(
        // Handle the successful response
        map((result: ResponseConnectionDb) => {
          localStorage.setItem('tokenConnection', result.tokenConnection);
          // Navigate to the project menu page
          this.router.navigate(['/private/dash/template/projectMenu']);
          mostrarMensaje(
            'success',
            'Successful connection to DB',
            'Success',
            this.toastr
          );
          // Reset the form
          form.reset();
          // Return the result
          return result;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Incorrect authentication...Enter database data correctly',
            'Mistake',
            this.toastr
          );
          // Reset the form
          form.reset();
          // Return the result
          throw err;
        })
      )
      // Subscribe with a generic observer
      .subscribe(observadorAny);
  }
}
