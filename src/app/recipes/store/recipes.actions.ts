import {Action} from '@ngrx/store';
import {Recipe} from '../../shared/model/recipe.model';

export const SET_RECIPES = '[RECIPES]SET_RECIPES';
export const FETCH_RECIPES = '[RECIPES]FETCH_RECIPES';
export const STORE_RECIPES = '[RECIPES]STORE_RECIPES';
export const ADD_RECIPE = '[RECIPES]ADD_RECIPES';
export const UPDATE_RECIPE = '[RECIPES]UPDATE_RECIPES';
export const DELETE_RECIPE = '[RECIPES]DELETE_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, recipe: Recipe}) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type Actions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes
;
