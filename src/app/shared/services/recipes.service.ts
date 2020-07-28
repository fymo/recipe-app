import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from '../model/recipe.model';
import {Ingredient} from '../model/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Injectable()
export class RecipesService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Meat and Fries',
      'Delicious meat with french fries',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Flickr_-_cyclonebill_-_B%C3%B8f_med_pommes_frites_%281%29.jpg/800px-Flickr_-_cyclonebill_-_B%C3%B8f_med_pommes_frites_%281%29.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Burger',
      'Nice burger with buns',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Umami_Burger_hamburger.jpg/800px-Umami_Burger_hamburger.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Ketchup', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
