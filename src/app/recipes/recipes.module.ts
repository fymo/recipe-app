import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {EmptyRecipeComponent} from './empty-recipe/empty-recipe.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    EmptyRecipeComponent,
    EditRecipeComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
