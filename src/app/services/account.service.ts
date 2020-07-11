import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { UserResponse } from '../models/UserResponse';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  private tokenSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email, password) {
    return this.http.post<UserResponse>(`${ environment.apiUrl }/login`, { email, password })
      .pipe(map(response => {
        var user = response.user;
        user.token = response.token;
        // Store user details and JWT token in local storage to keep user logged
        // in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        // Get token expiration and subscribe to counter, so when expired the user
        // is logged out automatically
        var expiresAt = this.getTokenExpiration(response.expiresIn);
        this.subscribeToExpirationCounter(expiresAt);
        return user;
      }));
  }

  logout() {
    // Remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.tokenSubscription.unsubscribe();
    this.router.navigate(['login']);
  }

  register(user: User) {
    return this.http.post(`${ environment.apiUrl }/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${ environment.apiUrl }/user`);
  }

  getById(id: number) {
    return this.http.get<User>(`${ environment.apiUrl }/user/${ id }`);
  }

  update(id: number, params: any) {
    return this.http.put<User>(`${ environment.apiUrl }/user/${ id }`, params)
      .pipe(map(x => {
        // Update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
          // Update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // Publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete<User>(`${ environment.apiUrl }/user/${ id }`)
      .pipe(map(x => {
        // Auto logout if the logged user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }

  private subscribeToExpirationCounter(expiresAt: Date) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(expiresAt))
      .subscribe(_ => {
        this.logout();
      });
  }

  private getTokenExpiration(expiresIn: number): Date {
    var expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
    return expiresAt;
  }
}