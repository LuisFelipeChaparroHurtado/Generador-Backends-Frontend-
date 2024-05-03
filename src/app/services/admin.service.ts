import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as myUrl from '../utilities/domains/uris';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // Define API endpoints for various operations
  public apiListUser: string = myUrl.API_LIST_USERS + '/list';
  public apiCreateUser: string = myUrl.API_CREATE_USERS + '/create';
  public apiFindUser: string = myUrl.API_SEARCH_USERS;
  public apiUpdateUser: string = myUrl.API_UPDATE_USER;
  public apiDeleteUser: string = myUrl.API_DELETE_USER + '/delete/';

  // Inject HttpClient service to perform HTTP requests
  constructor(private http: HttpClient) {}

  // Method to get the list of users from the server
  public getListUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiListUser);
  }
  // Method to create a new user on the server
  public createUser(objUser: User): Observable<User> {
    return this.http.post<User>(this.apiCreateUser, objUser);
  }
  // Method to find a user by ID from the server
  public getFindUser(idUser: string): Observable<User> {
    return this.http.get<User>(`${this.apiFindUser}/find/${idUser}`);
  }
  // Method to update a user by ID on the server
  public updateUser(idUser: string, user: User) {
    return this.http.put<User>(`${this.apiUpdateUser}/update/${idUser}`, user);
  }
  // Method to delete a user by ID on the server
  public deleteUser(idUser: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDeleteUser}${idUser}`);
  }
}
