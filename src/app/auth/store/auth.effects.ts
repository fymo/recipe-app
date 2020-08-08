import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../shared/model/user.model';
import * as Auth from './auth.actions';
import {AuthService} from '../auth.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {

  private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey;
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey;

  constructor(private actions$: Actions,
              private http: HttpClient,
              private authService: AuthService,
              private router: Router) {
  }

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(this.signupUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(this.loginUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      );
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap((auth: AuthActions.AuthSuccess) => {
      if (auth.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'DUMMY'};
      }

      if (userData._token) {
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new Auth.AuthSuccess({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
      }
      return {type: 'DUMMY'};
    })
  );
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {

  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthSuccess({
    email,
    userId,
    token,
    expirationDate,
    redirect: true
  });
};

const handleError = (errorResponse) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthFail(errorMessage));
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
  return of(new AuthActions.AuthFail(errorMessage));
};
