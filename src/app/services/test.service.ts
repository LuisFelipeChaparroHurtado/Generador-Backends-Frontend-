import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection } from '../models/connection';
import * as miUrl from '../utilities/domains/uris';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  // API endpoints for various test actions
  public apiConnectionTest: string = miUrl.API_CONECTIONDB;
  public apiGenerateModels: string = miUrl.API_GENERATEMODELS;
  public apiGenerateServer: string = miUrl.API_GENERATESERVER;
  public apiGenerateConnectionDB: string = miUrl.API_GENERATECONNECTIONDB;
  public apiGenerateVarDatabase: string = miUrl.API_GENERATEVARDATABASE;
  public apiGenerateRoutes: string = miUrl.API_GENERATEROUTES;
  public apiGenerateControllers: string = miUrl.API_GENERATECONTROLLERS;
  public apiGenerateDaos: string = miUrl.API_GENERATEDAO;
  public apiGenerateIndex: string = miUrl.API_GENERATEINDEX;
  public apiGeneratePackage: string = miUrl.API_GENERATEPACKAGE;
  public apiGeneratePackageLock: string = miUrl.API_GENERATEPACKAGELOCK;
  public apiGenerateTsConfig: string = miUrl.API_GENERATETSCONFIG;
  public apiGenerateReadme: string = miUrl.API_GENERATEREADME;

  constructor(private http: HttpClient) {}

  // Method to test a database connection
  public testConnection(objAcceso: Connection): Observable<Connection> {
    return this.http.post<Connection>(this.apiConnectionTest, objAcceso);
  }
  // Method to generate models and return an observable of any[]
  public generateModels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateModels);
  }
  // Method to generate a server and return an observable of any[]
  public generateServer(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateServer);
  }
  // Method to generate a connection database and return an observable of any[]
  public generateConnectionDB(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateConnectionDB);
  }
  // Method to generate variables for the database and return an observable of any[]
  public generateVarDatabase(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateVarDatabase);
  }
  // Method to generate routes and return an observable of any[]
  public generateRoutes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateRoutes);
  }
  // Method to generate controllers and return an observable of any[]
  public generateControllers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateControllers);
  }
  // Method to generate Data Access Objects (DAOs) and return an observable of any[]
  public generateDaos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateDaos);
  }
  // Method to generate an index and return an observable of any[]
  public generateIndex(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateIndex);
  }
  // Method to generate a package and return an observable of any[]
  public generatePackage(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGeneratePackage);
  }
  // Method to generate a package-lock and return an observable of any[]
  public generatePackageLock(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGeneratePackageLock);
  }
  // Method to generate a TypeScript configuration file and return an observable of any[]
  public generateTsConfig(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateTsConfig);
  }
  // Method to generate a TypeScript configuration file and return an observable of any[]
  public generateReadme(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGenerateReadme);
  }
}
