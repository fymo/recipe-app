import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import {ShoppingListService} from './shared/services/shopping-list.service';
import {AppRoutingModule} from './app-routing.module';
import { EmptyRecipeComponent } from './recipes/empty-recipe/empty-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipesService} from './shared/services/recipes.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    EmptyRecipeComponent,
    EditRecipeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [ShoppingListService, RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
