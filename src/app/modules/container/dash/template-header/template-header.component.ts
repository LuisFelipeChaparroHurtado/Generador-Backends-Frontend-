import { Component, OnDestroy, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { MyConnectionDb } from 'src/app/models/my-connection-db';
import { Tables } from 'src/app/models/tables';
import { ConnectionDbService } from 'src/app/services/connection-db.service';
import { TestService } from 'src/app/services/test.service';
import { mostrarMensaje } from 'src/app/utilities/messages/toast.func';

@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html',
  styleUrls: ['./template-header.component.css'],
})
export class TemplateHeaderComponent implements OnInit, OnDestroy {
  public serverText: string = ''; // Generated server code.
  public connectionDbText: string = ''; // Generated database connection code.
  public vardatabaseText: string = ''; // Generated database variable code.
  public controllerText: string[] = []; // List of generated controller codes.
  public daoText: string[] = []; // List of generated DAO codes.
  public modelText: string[] = []; // List of generated model codes.
  public routeText: string[] = []; // List of generated route codes.
  public indexText: string = ''; // Generated `index.ts` code.
  public readmeText: string = ''; // Generated `README.md` code.
  public packageText: string = ''; // Generated `package.json` code.
  public packageLockText: string = ''; // Generated `package-lock.json` code.
  public tsconfigText: string = ''; // Generated `tsconfig.json` code.
  public tables: Tables[] = []; // List of tables related to the database.
  public loadFinished: boolean = false; // Indicates if loading has finished.
  public subscription!: Subscription; // Subscription for observables.
  public connectionInfo: MyConnectionDb; // Contains database connection information.

  constructor(
    private testService: TestService, // Service for tests and code generation.
    public toastr: ToastrService, // Service to show notifications.
    public connection: ConnectionDbService // Database connection service.
  ) {
    this.connectionInfo = connection.getDataDb(); // Initializes database connection information.
  }

  ngOnInit(): void {
    // Methods to generate different parts of the backend.
    this.getGenerateServer();
    this.getGenerateConnectionDB();
    this.getGenerateVarDatabase();
    this.getGenerateControllers();
    this.getGenerateDaos();
    this.getGenerateModels();
    this.getGenerateRoutes();
    this.getGenerateIndex();
    this.getGenerateReadme();
    this.getGeneratePackage();
    this.getGeneratePackageLock();
    this.getGenerateTsConfig();
  }

  ngOnDestroy(): void {
    // Unsubscribe any active subscription.
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Generates server code.
   */
  private getGenerateServer(): void {
    this.subscription = this.testService
      .generateServer()
      .pipe(
        map((data: any) => {
          if (data && data.codeServer) {
            this.serverText = Array.isArray(data.codeServer)
              ? data.codeServer.join('\n')
              : data.codeServer;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve server code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((error) => {
          mostrarMensaje(
            'error',
            'Error retrieving server code',
            'Error',
            this.toastr
          );
          throw error;
        })
      )
      .subscribe();
  }

  /**
   * Generates database connection code.
   */
  private getGenerateConnectionDB(): void {
    this.subscription = this.testService
      .generateConnectionDB()
      .pipe(
        map((data: any) => {
          if (data && data.codeConnectionDB) {
            this.connectionDbText = Array.isArray(data.codeConnectionDB)
              ? data.codeConnectionDB.join('\n')
              : data.codeConnectionDB;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve database connection code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((error) => {
          mostrarMensaje(
            'error',
            'Error retrieving database connection code',
            'Error',
            this.toastr
          );
          throw error;
        })
      )
      .subscribe();
  }

  /**
   * Generates code for database variables.
   */
  private getGenerateVarDatabase(): void {
    this.subscription = this.testService
      .generateVarDatabase()
      .pipe(
        map((data: any) => {
          if (data && data.codeVarDatabase) {
            this.vardatabaseText = Array.isArray(data.codeVarDatabase)
              ? data.codeVarDatabase.join('\n')
              : data.codeVarDatabase;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve database variable code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((error) => {
          mostrarMensaje(
            'error',
            'Error retrieving database variable code',
            'Error',
            this.toastr
          );
          throw error;
        })
      )
      .subscribe();
  }

  /**
   * Generates controller code.
   */
  public getGenerateControllers(): void {
    this.subscription = this.testService
      .generateControllers()
      .pipe(
        map((resultado: any) => {
          if (
            Array.isArray(resultado.codeController) &&
            Array.isArray(resultado.tables)
          ) {
            this.controllerText = resultado.codeController.map(
              (controller: string | string[]) =>
                Array.isArray(controller) ? controller.join('\n') : controller
            );

            // Asignar las tablas
            this.tables = resultado.tables;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve controller code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Error retrieving controllers',
            'Error',
            this.toastr
          );
          throw err;
        }),
        finalize(() => {
          this.loadFinished = true;
        })
      )
      .subscribe();
  }

  /**
   *  Generates DAO code.
   */
  public getGenerateDaos(): void {
    this.subscription = this.testService
      .generateDaos()
      .pipe(
        map((resultado: any) => {
          if (Array.isArray(resultado.codeDao)) {
            this.daoText = resultado.codeDao.map((dao: string | string[]) =>
              Array.isArray(dao) ? dao.join('\n') : dao.toString()
            );
            // Asignar las tablas
            this.tables = resultado.tables;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve DAO code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Error retrieving DAOs',
            'Error',
            this.toastr
          );
          throw err;
        }),
        finalize(() => {
          this.loadFinished = true;
        })
      )
      .subscribe();
  }

  /**
   * Generates model code.
   */
  public getGenerateModels(): void {
    this.subscription = this.testService
      .generateModels()
      .pipe(
        map((resultado: any) => {
          if (Array.isArray(resultado.modelTabledb)) {
            this.modelText = resultado.modelTabledb.map(
              (model: string | string[]) =>
                Array.isArray(model) ? model.join('\n') : model.toString()
            );
            // Asignar las tablas
            this.tables = resultado.tables;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve model code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Error retrieving models',
            'Error',
            this.toastr
          );
          throw err;
        }),
        finalize(() => {
          this.loadFinished = true;
        })
      )
      .subscribe();
  }

  /**
   * Generates route code.
   */
  public getGenerateRoutes(): void {
    this.subscription = this.testService
      .generateRoutes()
      .pipe(
        map((resultado: any) => {
          if (Array.isArray(resultado.codeRoutes)) {
            this.routeText = resultado.codeRoutes.map(
              (route: string | string[]) =>
                Array.isArray(route) ? route.join('\n') : route.toString()
            );
            // Asignar las tablas
            this.tables = resultado.tables;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve route code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Error retrieving routes',
            'Error',
            this.toastr
          );
          throw err;
        }),
        finalize(() => {
          this.loadFinished = true;
        })
      )
      .subscribe();
  }

  /**
   * Generates `index.ts` code.
   */
  public getGenerateIndex(): void {
    this.subscription = this.testService
      .generateIndex()
      .pipe(
        map((data: any) => {
          if (data && data.codeIndex) {
            this.indexText = Array.isArray(data.codeIndex)
              ? data.codeIndex.join('\n')
              : data.codeIndex;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve index code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((error) => {
          mostrarMensaje(
            'error',
            'Error retrieving index',
            'Error',
            this.toastr
          );
          throw error;
        })
      )
      .subscribe();
  }

  /**
   * Generates `package.json` code.
   */
  public getGeneratePackage(): void {
    this.subscription = this.testService
      .generatePackage()
      .pipe(
        map((data: any) => {
          if (data && data.codePackage) {
            this.packageText = Array.isArray(data.codePackage)
              ? data.codePackage.join('\n')
              : data.codePackage;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve package.json code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((error) => {
          mostrarMensaje(
            'error',
            'Error retrieving package.json',
            'Error',
            this.toastr
          );
          throw error;
        })
      )
      .subscribe();
  }

  /**
   * Generates `package-lock.json` code.
   */
  public getGeneratePackageLock(): void {
    this.subscription = this.testService
      .generatePackageLock()
      .pipe(
        map((data: any) => {
          if (data && data.codePackageLock) {
            this.packageLockText = Array.isArray(data.codePackageLock)
              ? data.codePackageLock.join('\n')
              : data.codePackageLock;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve package-lock.json code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((error) => {
          mostrarMensaje(
            'error',
            'Error retrieving package-lock.json',
            'Error',
            this.toastr
          );
          throw error;
        })
      )
      .subscribe();
  }

  /**
   * Generates `tsconfig.json` code.
   */
  public getGenerateTsConfig(): void {
    this.subscription = this.testService
      .generateTsConfig()
      .pipe(
        map((data: any) => {
          if (data && data.codeTsconfig) {
            this.tsconfigText = Array.isArray(data.codeTsconfig)
              ? data.codeTsconfig.join('\n')
              : data.codeTsconfig;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve tsconfig.json code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((error) => {
          mostrarMensaje(
            'error',
            'Error retrieving tsconfig.json',
            'Error',
            this.toastr
          );
          throw error;
        })
      )
      .subscribe();
  }

 /**
   * Generates `README.md` code.
   */
  public getGenerateReadme(): void {
    this.subscription = this.testService
      .generateReadme()
      .pipe(
        map((data: any) => {
          if (data && data.codeReadme) {
            this.readmeText = Array.isArray(data.codeReadme)
              ? data.codeReadme.join('\n')
              : data.codeReadme;
          } else {
            mostrarMensaje(
              'error',
              'Could not retrieve README.md code',
              'Error',
              this.toastr
            );
          }
        }),
        catchError((error) => {
          mostrarMensaje(
            'error',
            'Error retrieving README.md',
            'Error',
            this.toastr
          );
          throw error;
        })
      )
      .subscribe();
  }

  /**
   * Method that compresses all generated files into a zip file and allows the user to download it.
   */
  public async createZip(): Promise<Blob> {
    const zip = new JSZip();

    // Create Backend folder
    const backendFolder = zip.folder(
      `Backend${this.connectionInfo.database
        .charAt(0)
        .toUpperCase()}${this.connectionInfo.database.slice(1)}`
    );
    if (!backendFolder) {
      throw new Error('Could not create Backend folder in ZIP file.');
    }
    backendFolder.file('index.ts', this.indexText);
    backendFolder.file('README.md', this.readmeText);
    backendFolder.file('package.json', this.packageText);
    backendFolder.file('package-lock.json', this.packageLockText);
    backendFolder.file('tsconfig.json', this.tsconfigText);

    // Create src folder inside Backend
    const srcFolder = backendFolder.folder('src');
    if (!srcFolder) {
      throw new Error('Could not create src folder in ZIP file.');
    }

    // Create config folder inside src
    const configFolder = srcFolder.folder('config');
    if (!configFolder) {
      throw new Error('Could not create config folder in ZIP file.');
    }

    // Create api folder inside config
    const apiFolder = configFolder.folder('api');
    if (!apiFolder) {
      throw new Error('Could not create api folder in ZIP file.');
    }

    // Create connection folder inside config
    const connectionFolder = configFolder.folder('connection');
    if (!connectionFolder) {
      throw new Error(
        'The connection folder could not be created in the ZIP file.'
      );
    }

    // Create domains folder within config
    const domainsFolder = configFolder.folder('domains');
    if (!domainsFolder) {
      throw new Error(
        'The domains folder could not be created in the ZIP file.'
      );
    }

    // Add the corresponding files
    apiFolder.file('Server.ts', this.serverText);
    connectionFolder.file('connectionDB.ts', this.connectionDbText);
    domainsFolder.file('var_database.ts', this.vardatabaseText);

    const controllersFolder = srcFolder.folder('controller');
    if (!controllersFolder) {
      throw new Error('Could not create controllers folder in ZIP file.');
    }

    // Add each controller inside the controllers folder
    for (let index = 0; index < this.controllerText.length; index++) {
      const controllerContent = this.controllerText[index];
      const table = this.tables[index]; // Assuming you've saved the tables in a this.tables property
      const fileName = `${
        table.table_name.charAt(0).toUpperCase() + table.table_name.slice(1)
      }Controller.ts`; // Use table name
      controllersFolder.file(fileName, controllerContent);
    }

    const daoFolder = srcFolder.folder('dao');
    if (!daoFolder) {
      throw new Error('Could not create daos folder in ZIP file.');
    }

    // Add each DAO inside the daos folder
    for (let index = 0; index < this.daoText.length; index++) {
      const daoContent = this.daoText[index];
      const table = this.tables[index]; // Assuming you've saved the tables in a this.tables property
      const fileName = `${
        table.table_name.charAt(0).toUpperCase() + table.table_name.slice(1)
      }DAO.ts`; // Use table name
      daoFolder.file(fileName, daoContent);
    }

    const modelsFolder = srcFolder.folder('model');
    if (!modelsFolder) {
      throw new Error('Could not create models folder in ZIP file.');
    }

    // Add each model inside the models folder
    for (let index = 0; index < this.modelText.length; index++) {
      const modelContent = this.modelText[index];
      const table = this.tables[index]; // Assuming you've saved the tables in a this.tables property
      const fileName = `${
        table.table_name.charAt(0).toUpperCase() + table.table_name.slice(1)
      }.ts`; // Use table name
      modelsFolder.file(fileName, modelContent);
    }

    const routesFolder = srcFolder.folder('routes');
    if (!routesFolder) {
      throw new Error('Could not create routes folder in ZIP file.');
    }

    // Add each route inside the routes folder
    for (let index = 0; index < this.routeText.length; index++) {
      const routeContent = this.routeText[index];
      const table = this.tables[index]; // Assuming you've saved the tables in a this.tables property
      const fileName = `${
        table.table_name.charAt(0).toUpperCase() + table.table_name.slice(1)
      }Route.ts`; // Use table name
      routesFolder.file(fileName, routeContent);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    return content;
  }
  /**
   * Download the generated ZIP file.
   */
  public async downloadFolder(): Promise<void> {
    const zipBlob = await this.createZip();

    const url = window.URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Backend${this.connectionInfo.database
      .charAt(0)
      .toUpperCase()}${this.connectionInfo.database.slice(1)}.zip`;

    link.click();
    window.URL.revokeObjectURL(url);
  }
}
