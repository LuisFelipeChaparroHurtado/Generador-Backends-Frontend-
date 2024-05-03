import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Tables } from 'src/app/models/tables';
import { TestService } from 'src/app/services/test.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-template-controller',
  templateUrl: './template-controller.component.html',
  styleUrls: ['./template-controller.component.css'],
})
export class TemplateControllerComponent implements OnInit, OnDestroy {
  // Property representing any type, used to initialize the subscription
  public tmp: any;
  // Flag to indicate whether loading has completed
  public cargaFinalizada: boolean;
  // Subscription object for managing the current subscription to an observable
  public suscription: Subscription;
  public nameController: Tables;
  // Array to store the text of the database connection
  public controllerText: String[];
  public codTable: any;
  // Flag to track whether text has been copied to the clipboard
  public copied: boolean = false;

  // Reference to the HTML <div> element (editor textarea) in the component's template
  @ViewChild('editorTextarea') editorTextarea!: ElementRef<HTMLDivElement>;

  // Constructor injects TestService and ToastrService dependencies
  constructor(
    private testService: TestService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.cargaFinalizada = false; // Initialize loading flag
    this.suscription = this.tmp; // Initialize the subscription
    this.controllerText = []; // Initialize the array to store controller text
    this.nameController = new Tables('', '', '');
  }

  // Lifecycle hook that triggers when the component initializes
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.codTable = params.get('codTable');
    });
    // Fetch the generated controller on component initialization
    this.getGenerateController(this.codTable);
  }
  // Lifecycle hook that triggers when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from the subscription when the component is destroyed
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  // Method to fetch the generated controllers
  public getGenerateController(i: any): void {
    this.suscription = this.testService
      .generateControllers()
      .pipe(
        map((resultado: any) => {
          // Show a success message using the Toastr service
          mostrarMensaje(
            'success',
            'Generation of Controller',
            'Success',
            this.toastr
          );
          // Store the controller text
          this.nameController = resultado.tables[i];
          this.controllerText = resultado.codeController[i];
        }),
        catchError((err) => {
          // Show an error message if the operation fails
          mostrarMensaje(
            'error',
            'Generation of Controller',
            'Error',
            this.toastr // Rethrow the error
          );
          throw err;
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
            this.copied = false; // Reset copied flag after a short duration
          }, 1000);
        })
        .catch((error) => console.error('Could not copy text: ', error));
    }
  }
}
