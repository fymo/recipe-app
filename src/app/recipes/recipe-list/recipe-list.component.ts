import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../../shared/model/recipe.model';
import {Subscription} from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() listRecipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store
      .select('recipes')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe(recipes => {
      this.recipes = recipes;
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
