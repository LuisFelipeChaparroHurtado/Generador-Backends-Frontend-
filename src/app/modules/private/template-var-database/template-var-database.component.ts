import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { TestService } from 'src/app/services/test.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-template-var-database',
  templateUrl: './template-var-database.component.html',
  styleUrls: ['./template-var-database.component.css'],
})
export class TemplateVarDatabaseComponent implements OnInit, OnDestroy {
  // Temporary storage variable for the subscription
  public tmp: any;
  // Flag indicating whether loading is complete
  public cargaFinalizada: boolean;
  // Subscription object for managing the current subscription to an observable
  public suscription: Subscription;
  // Stores the table data related to the VarDatabase generation
  public varDatabaseText: String[];
  // Flag to track whether the text has been copied to the clipboard
  public copied: boolean = false;

  // Reference to the HTML <div> element (editor textarea) in the component's template
  @ViewChild('editorTextarea') editorTextarea!: ElementRef<HTMLDivElement>;

  // Constructor injects TestService, ToastrService, and ActivatedRoute dependencies
  constructor(private testService: TestService, public toastr: ToastrService) {
    this.cargaFinalizada = false; // Initialize loading flag
    this.suscription = this.tmp; // Initialize the subscription
    this.varDatabaseText = []; // Initialize the array to store VarDatabase text
  }

  // Lifecycle hook that triggers when the component initializes
  ngOnInit(): void {
    // Fetch the generated VarDatase
    this.getGenerateConnectionDB();
  }

  // Lifecycle hook that triggers when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from the subscription when the component is destroyed
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  // Method to fetch the generated DAO for the specified table code
  public getGenerateConnectionDB(): void {
    this.suscription = this.testService
      .generateVarDatabase()
      .pipe(
        // Handle the result of the API call
        map((resultado: any) => {
          // Display success message
          mostrarMensaje(
            'success',
            'Generation of var_database.ts',
            'Success',
            this.toastr
          );
          // Assign the table data and VarDatabase text
          this.varDatabaseText = resultado.codeVarDatabase;
        }),
        // Handle any errors that occur during the API call
        catchError((err) => {
          // Display error message
          mostrarMensaje(
            'error',
            'Generation of var_database.ts',
            'Error',
            this.toastr
          );
          // Rethrow the error
          throw err;
        }),
        // Mark loading as complete when the API call is finalized
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      // Subscribe to the observable and assign the observer
      .subscribe(observadorAny);
  }

  // Method to copy all text from the editor textarea to the clipboard
  public copyAll(): void {
    // Check if the editorTextarea is defined
    if (this.editorTextarea) {
      // Get the content of the editor textarea
      const textareaContent = this.editorTextarea.nativeElement.innerText;
      // Copy the content to the clipboard
      navigator.clipboard
        .writeText(textareaContent)
        .then(() => {
          console.log('Text copied to clipboard');
          this.copied = true; // Set copied flag to true
          setTimeout(() => {
            this.copied = false; // Reset copied flag after a short duration
          }, 1000);
        })
        // Log any errors that occur during copying
        .catch((error) => console.error('Could not copy text: ', error));
    }
  }
}
