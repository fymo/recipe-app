import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../shared/model/recipe.model';
import {ShoppingListService} from '../../shared/services/shopping-list.service';
import {RecipesService} from '../../shared/services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
  }

  addToShoppingList(): void{
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
