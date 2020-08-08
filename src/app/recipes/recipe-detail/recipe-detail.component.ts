import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../shared/model/recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {map, switchMap} from 'rxjs/operators';
import * as RecipesActions from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => +params.id),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map(
        recipeState => recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        }))
    ).subscribe(recipe => this.recipe = recipe);
  }

  addToShoppingList(): void{
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(): void {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
