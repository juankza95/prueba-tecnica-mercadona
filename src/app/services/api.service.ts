import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public readonly BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient,
  ) { }

  private delayRequest<T = unknown>(ms = 3000) { // Up to 3s delay
    return delay<T>(Math.floor(Math.random() * ms));
  }

  public catchErrorAndReturn<T = unknown>(value: T) {
    return catchError<T, Observable<T>>((e: HttpErrorResponse) => {
      if (isDevMode()) {
        console.error(e);
      }

      return of(value);
    });
  }

  //#region User

  public createUser(data: Partial<User>) {
    return this.http.post<User>(`${this.BASE_URL}/users`, data).pipe(
      this.delayRequest()
    );
  }

  public readUser(id: string | number) {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`).pipe(
      this.delayRequest()
    );
  }

  public updateUser(id: string | number, data: User) {
    return this.http.put<User>(`${this.BASE_URL}/users/${id}`, data).pipe(
      this.delayRequest()
    );
  }

  public deleteUser(id: string | number) {
    return this.http.delete<unknown>(`${this.BASE_URL}/users/${id}`).pipe(
      this.delayRequest()
    );
  }

  public listUsers() {
    return this.http.get<User[]>(`${this.BASE_URL}/users`).pipe(
      this.delayRequest(),
    );
  }

  //#endregion

}
