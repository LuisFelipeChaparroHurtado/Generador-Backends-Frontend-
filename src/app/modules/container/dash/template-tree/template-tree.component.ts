import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Tables } from 'src/app/models/tables';
import { TestService } from 'src/app/services/test.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-template-tree',
  templateUrl: './template-tree.component.html',
  styleUrls: ['./template-tree.component.css'],
})
export class TemplateTreeComponent implements OnInit, OnDestroy {
  // Properties to store data fetched from the database.
  public tmp: any; // Temporary variable, purpose unclear without more context.
  public cargaFinalizada: boolean; // Indicates whether loading is complete.
  public tableText: string[]; // Stores text related to tables.
  public oneTableText: string[]; // Stores text related to a specific table.
  public oneControllerText: string[]; // Stores text related to a specific controller.
  public arregloTables: Tables[]; // Stores information about tables.
  public codTable: any; // Code for a specific table, may be used to identify the table.
  public suscription: Subscription; // Subscription to an observable.

  constructor(
    private testService: TestService, // Injects the TestService for data interaction.
    public toastr: ToastrService // Injects the ToastrService for showing notifications.
  ) {
    // Initialization of properties.
    this.tableText = [];
    this.oneControllerText = [];
    this.oneTableText = [];
    this.arregloTables = [];
    this.cargaFinalizada = false;
    this.suscription = this.tmp; // Initializes the subscription with a temporary variable.
  }

  // Method that runs when the component is destroyed.
  ngOnInit(): void {
    this.getGenerateModels(this.codTable); // Calls getGenerateModels with a table code.
  }

  // Método que se ejecuta cuando el componente se destruye.
  ngOnDestroy(): void {
    if (this.suscription) {
      // If there is a subscription, cancel it to prevent memory leaks.
      this.suscription.unsubscribe();
    }
  }

  // Method to fetch models based on a table code.
  public getGenerateModels(i: any): void {
    // Subscribes to a function that fetches models from the TestService.
    this.suscription = this.testService
      .generateModels()
      .pipe(
        map((resultado: any) => {
          // Assigns the results to the component's properties.
          this.arregloTables = resultado.tables;
          this.tableText = resultado.modelTabledb;
          this.oneTableText = resultado.modelTabledb[i];
          this.cargaFinalizada = true; // Indicates that loading is complete.
        }),
        // Handles any error that might occur during the subscription.
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Generate of Models',
            'Error',
            this.toastr
          );
          this.cargaFinalizada = false; // Indicates that loading was not completed.
          throw err; // Propagates the error.
        })
      )
      // Observer that manages the subscription.
      .subscribe(observadorAny);
  }
}
