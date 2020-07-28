import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../../shared/model/recipe.model';
import {RecipesService} from '../../shared/services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() listRecipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }


}
