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
  selector: 'app-template-connection',
  templateUrl: './template-connection.component.html',
  styleUrls: ['./template-connection.component.css'],
})
export class TemplateConnectionComponent implements OnInit, OnDestroy {
  // Property representing any type, used to initialize the subscription
  public tmp: any;
  // Flag to indicate whether loading has completed
  public cargaFinalizada: boolean;
  // Subscription object for managing the current subscription to an observable
  public suscription: Subscription;
  // Array to store the text of the database connection
  public connectionDbText: String[];
  // Flag to track whether text has been copied to the clipboard
  public copied: boolean = false;

  // Reference to the HTML <div> element (editor textarea) in the component's template
  @ViewChild('editorTextarea') editorTextarea!: ElementRef<HTMLDivElement>;

  // Constructor injects TestService and ToastrService dependencies
  constructor(private testService: TestService, public toastr: ToastrService) {
    this.cargaFinalizada = false; // Initialize loading flag
    this.suscription = this.tmp; // Initialize the subscription
    this.connectionDbText = []; // Initialize the array to store connection DB text
  }

  // Lifecycle hook that triggers when the component initializes
  ngOnInit(): void {
    // Fetch the generated database connection on component initialization
    this.getGenerateConnectionDB();
  }
   // Lifecycle hook that triggers when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from the subscription when the component is destroyed
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  // Method to fetch the generated database connection
  public getGenerateConnectionDB(): void {
    this.suscription = this.testService
      .generateConnectionDB()
      .pipe(
        map((resultado: any) => {
          // Show a success message using the Toastr service
          mostrarMensaje(
            'success',
            'Generation of connectionDB.ts',
            'Success',
            this.toastr
          );
          // Store the connection DB text
          this.connectionDbText = resultado.codeConnectionDB;
        }),
        catchError((err) => {
          // Show an error message if the operation fails
          mostrarMensaje(
            'error',
            'Generation of connectionDB.ts',
            'Error',
            this.toastr
          );
          throw err; // Rethrow the error
        }),
        // Finalize the loading flag when the operation completes
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
            // Reset copied flag after a short duration
            this.copied = false; 
          }, 1000);
        })
        .catch((error) => console.error('Could not copy text: ', error));
    }
  }
}
