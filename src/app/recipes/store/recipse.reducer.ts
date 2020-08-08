import {Recipe} from '../../shared/model/recipe.model';
import * as RecipesActions from './recipes.actions';
import {DELETE_RECIPE} from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: []
};

export function recipeReducer(state: State = initialState, action: RecipesActions.Actions): State {
  switch (action.type){
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:

      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
