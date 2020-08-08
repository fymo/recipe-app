import {Action} from '@ngrx/store';

export const LOGIN_START = '[AUTH]LOGIN_START';

export const SIGNUP_START = '[AUTH]SIGNUP_START';
export const AUTH_SUCCESS = '[AUTH]AUTH_SUCCESS';
export const AUTH_FAIL = '[AUTH]AUTH_FAIL';
export const LOGOUT = '[AUTH]LOGOUT';
export const CLEAR_ERROR = '[AUTH]CLEAR_ERROR';
export const AUTO_LOGIN = '[AUTH]AUTO_LOGIN';

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {email: string, password: string}) {
  }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: {email: string, password: string}) {
  }
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: {
    email: string,
    userId: string, readonly token: string,
    expirationDate: Date
  }) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {
  }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN
}

export type Actions =
  | Logout
  | SignupStart
  | LoginStart
  | AuthFail
  | AuthSuccess
  | ClearError
  | AutoLogin
  ;
