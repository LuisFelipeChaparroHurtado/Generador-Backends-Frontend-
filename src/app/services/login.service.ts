import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { MySession } from '../models/my-session';
import { ResponseLogin } from '../models/response-login';
import * as myUrl from '../utilities/domains/uris';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // API endpoint for login requests
  public apiLogin: string = myUrl.API_LOGIN + '/login';
  // Object to hold session data
  public objMySession: MySession;

  constructor(private http: HttpClient, private router: Router) {
    // Initialize the session data
    this.objMySession = this.startedMySession();
  }

  // Initialize the session data with default values
  private startedMySession(): MySession {
    return new MySession('', '', '');
  }

  // Method to log in a user
  public login(objAccess: Login): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(this.apiLogin, objAccess);
  }

  // Method to log out a user
  public logOut(): void {
    // Remove session tokens from local storage
    localStorage.removeItem('tokenGenBack');
    localStorage.removeItem('tokenConnection');
    this.router.navigate(['/land/login']);
  }
  // Method to get the current session data
  public getDataSession(): MySession {
    return this.objMySession;
  }

  // Method to check if the user is authenticated
  public checkUser(): boolean {
    // Check if there is a session token in local storage
    if (localStorage.getItem('tokenGenBack')) {
      try {
        const myToken: any = localStorage.getItem('tokenGenBack');
        let objTmp: any = jwtDecode(myToken);
        this.objMySession.id = objTmp.id;
        this.objMySession.name = objTmp.name;
        this.objMySession.profile = objTmp.profile;
        return true; // Return true if user is authenticated
      } catch (err) {}
    }
    return false;
  }

  // Method to check if the user has an admin profile
  public checkProfile(): boolean {
    // Check if the user has an admin profile
    if (this.objMySession.profile == 'ADMIN') {
      try {
        return true; // Return true if user has admin profile
      } catch (err) {}
    }
    console.log(this.objMySession.profile);
    return false;
  }
}
