import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as myUrl from '../utilities/domains/uris';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // API endpoints for user-related actions
  public apiUpdateUser: string = myUrl.API_EDITAR_USUARIO;
  public apiFindUser: string = myUrl.API_OBTENER_UN_USUARIO;
  constructor(private http: HttpClient) {}
  // Method to retrieve user details by ID and return an observable of type User
  public getUser(elementoId: string): Observable<User> {
    return this.http.get<User>(`${this.apiFindUser}/find/${elementoId}`);
  }
  // Method to update user profile by ID and return an observable of type User
  public updateProfile(elementoId: string, product: User) {
    return this.http.put<User>(
      `${this.apiUpdateUser}/update/${elementoId}`,
      product
    );
  }
}
