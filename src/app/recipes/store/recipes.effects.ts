import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipesActions from './recipes.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../../shared/model/recipe.model';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {
  private postsUrl = 'https://fymo-recipes-app.firebaseio.com/';

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => this.http.get<Recipe[]>(this.postsUrl + 'recipes.json')),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    map(recpies => {
      return new RecipesActions.SetRecipes(recpies);
    })
  );

  @Effect({dispatch: false})
  storeEffect = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(this.postsUrl + 'recipes.json', recipesState.recipes);
    })
  );
}
