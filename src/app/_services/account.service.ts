import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject,Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { shareReplay,tap, catchError } from 'rxjs/operators';
import { Account} from '../_models/account'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userIdentity: Account | null = null;
  private accountCache$?: Observable<Account | null>;
  // private authenticationState = new ReplaySubject<Account | null>(1);

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  fetch(): Observable<Account> {
    const url =`${environment.apiUrl}/account`
    return this.http.get<Account>(url);
  }

  saveAcc(account: Account): Observable<{}> {
    const url =`${environment.apiUrl}/account`
    return this.http.post(url, account);
  }


  // authenticate(identity: Account | null): void {
  //   this.userIdentity = identity;
  //   this.authenticationState.next(this.userIdentity);
  // }

  // hasAnyAuthority(authorities: string[] | string): boolean {
  //   if (!this.userIdentity || !this.userIdentity.authorities) {
  //     return false;
  //   }
  //   if (!Array.isArray(authorities)) {
  //     authorities = [authorities];
  //   }
  //   return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  // }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        // tap((account: Account | null) => {
        //   this.authenticate(account);

        //   if (account) {
        //     // this.navigateToStoredUrl();
        //   }
        // }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }



}
