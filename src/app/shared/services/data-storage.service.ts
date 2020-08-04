import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../model/recipe.model';
import {RecipesService} from './recipes.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private postsUrl = 'https://fymo-recipes-app.firebaseio.com/';

  constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) {
  }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.postsUrl + 'recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>(
      this.postsUrl + 'recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
