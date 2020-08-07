import {Action} from '@ngrx/store';

export const LOGIN_START = '[AUTH]LOGIN_START';
export const LOGIN_FAIL = '[AUTH]LOGIN_FAIL';
export const LOGIN = '[AUTH]LOGIN';
export const LOGOUT = '[AUTH]LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: {
    email: string,
    userId: string, readonly token: string,
    expirationDate: Date
  }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {email: string, password: string}) {
  }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions =
  | Login
  | Logout
  | LoginStart
  | LoginFail;
