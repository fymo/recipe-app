import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as Auth from '../auth/store/auth.actions';
import {FetchRecipes, StoreRecipes} from '../recipes/store/recipes.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData(): void {
    this.store.dispatch(new StoreRecipes());
  }

  onFetchData(): void {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(new Auth.Logout());
  }
}
