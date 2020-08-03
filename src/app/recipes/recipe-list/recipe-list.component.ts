import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../../shared/model/recipe.model';
import {RecipesService} from '../../shared/services/recipes.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() listRecipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  private subscription: Subscription;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.subscription = this.recipesService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
