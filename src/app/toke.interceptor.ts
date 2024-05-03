import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('tokenGenBack');
    const modifyRequest = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + token),
    });
    return next.handle(modifyRequest).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.router.navigate(['/land/login']);
          localStorage.removeItem('tokenGenBack');
          localStorage.removeItem('tokenConnection');
        }
        return throwError(() => err);
      })
    );
  }
}
