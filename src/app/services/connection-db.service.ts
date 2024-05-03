import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Connection } from '../models/connection';
import { MyConnectionDb } from '../models/my-connection-db';
import { ResponseConnectionDb } from '../models/response-connection-db';
import * as myUrl from '../utilities/domains/uris';

@Injectable({
  providedIn: 'root',
})
export class ConnectionDbService {
  // Define the API endpoint for the database connection
  public apiConnectionDb: string = myUrl.API_CONECTIONDB;
  // Store the current database connection information
  public objMyConnectionDb: MyConnectionDb;
  constructor(private http: HttpClient, private router: Router) {
    // Initialize the database connection object
    this.objMyConnectionDb = this.startedMyConnectionDb();
  }

  // Initialize the database connection object with default values
  private startedMyConnectionDb(): MyConnectionDb {
    return new MyConnectionDb('');
  }
  // Method to test the database connection
  public testConnection(
    objAcceso: Connection
  ): Observable<ResponseConnectionDb> {
    return this.http.post<ResponseConnectionDb>(
      this.apiConnectionDb,
      objAcceso
    );
  }
  // Method to disconnect from the database
  public disconnect(): void {
    // Remove the token from local storage and navigate to the generator component
    localStorage.removeItem('tokenConnection');
    this.router.navigate(['/private/dash/generator']);
  }
  // Method to get the current database connection information
  public getDataDb(): MyConnectionDb {
    return this.objMyConnectionDb;
  }
  // Method to check if there is an active database connection
  public checkConnectionDb(): boolean {
    // Check if the token for database connection exists in local storage
    if (localStorage.getItem('tokenConnection')) {
      try {
        // Decode the token and extract database information
        const myToken: any = localStorage.getItem('tokenConnection');
        let objTmp: any = jwtDecode(myToken);
        this.objMyConnectionDb.database = objTmp.database;
        return true; // Return true if database connection exists
      } catch (err) {}
    }
    return false; // Return false if no database connection exists
  }
}
