import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = 'http://localhost:3000/todos';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // user registration
  registration(user: User): Observable<User> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, user).pipe(catchError(this.handleError));
  }

  // get all registred user
  getRegistredUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  // delete registred user
  deleteUser(userId: number): Observable<User> {
    let API_URL = `${this.apiUrl}/${userId}`;
    return this.http.delete(API_URL).pipe(catchError(this.handleError));
  }

  // get user by id
  getUserById(id: number): Observable<User> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.get(API_URL).pipe(catchError(this.handleError));
  }

  // update user info by id
  updateUser(id: number, data: User): Observable<User> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .patch(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
