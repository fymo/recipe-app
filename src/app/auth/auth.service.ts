import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from './store/auth.reducer';
import {Logout} from '../auth/store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {

  tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.State>) {
  }

  setLogoutTimer(expirationDuration: number): void{
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new Logout());
    }, expirationDuration);
  }

  clearLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
