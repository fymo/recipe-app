import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../shared/model/user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  private API_KEY = 'AIzaSyApgkt3SmTSDhN_35SUXAlOu99P2KKp0uA';
  private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY;
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY;

  userSubject = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signupUrl, {
      email, password, returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => { this.handleAuthentication(resData); }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.loginUrl, {
      email, password, returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => { this.handleAuthentication(resData); }));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (user.token) {
      this.userSubject.next(user);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;

    }
    return throwError(errorMessage);
  }

  private handleAuthentication(resData: AuthResponseData){
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    this.userSubject.next(user);
    this.autoLogout(+resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
