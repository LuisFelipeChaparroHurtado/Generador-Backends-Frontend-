import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Tables } from 'src/app/models/tables';
import { TestService } from 'src/app/services/test.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';
import { observadorAny } from 'src/app/utilities/observers/type-any';

@Component({
  selector: 'app-template-route',
  templateUrl: './template-route.component.html',
  styleUrls: ['./template-route.component.css'],
})
export class TemplateRouteComponent implements OnInit, OnDestroy {
  // Flag indicating whether loading is complete
  public cargaFinalizada: boolean;
  // Subscription object for managing the current subscription to an observable
  public suscription: Subscription;
  // Stores the table data related to the route generation
  public nameRoute: Tables;
  // Array to store the generated route text
  public routeText: String[];
  // Stores the table code from the route parameters
  public codTable: any;
  // Flag to track whether the text has been copied to the clipboard
  public copied: boolean = false;

  // Reference to the HTML <div> element (editor textarea) in the component's template
  @ViewChild('editorTextarea') editorTextarea!: ElementRef<HTMLDivElement>;

  // Constructor injects TestService, ToastrService, and ActivatedRoute dependencies
  constructor(
    private testService: TestService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.cargaFinalizada = false; // Initialize loading flag
    this.suscription = new Subscription(); // Initialize the subscription
    this.routeText = []; // Initialize the array to store route text
    this.nameRoute = new Tables('', '', ''); // Initialize the nameRoute variable
  }

  // Lifecycle hook that triggers when the component initializes
  ngOnInit(): void {
    // Subscribe to the route parameters and extract the table code
    this.route.paramMap.subscribe((params) => {
      this.codTable = params.get('codTable');
    });
    // Fetch the generated DAO for the specified table code
    this.getGenerateRoute(this.codTable);
  }

  // Lifecycle hook that triggers when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from the subscription when the component is destroyed
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  // Method to fetch the generated route for the specified table code
  public getGenerateRoute(i: any): void {
    this.suscription = this.testService
      .generateRoutes()
      .pipe(
        // Handle the result of the API call
        map((resultado: any) => {
          // Display success message
          mostrarMensaje(
            'success',
            'Generation of Routes',
            'Success',
            this.toastr
          );
          // Assign the table data and Route text
          this.nameRoute = resultado.tables[i];
          this.routeText = resultado.codeRoutes[i];
        }),
        // Handle any errors that occur during the API call
        catchError((err) => {
          // Display error message
          mostrarMensaje('error', 'Generation of Routes', 'Error', this.toastr);
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
