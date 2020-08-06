import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth/auth.guard';
import {EmptyRecipeComponent} from './empty-recipe/empty-recipe.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipesResolverService} from './recipes-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: EmptyRecipeComponent},
      {path: 'new', component: EditRecipeComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: EditRecipeComponent, resolve: [RecipesResolverService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule{
}
