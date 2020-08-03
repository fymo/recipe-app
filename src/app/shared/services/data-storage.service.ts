import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../model/recipe.model';
import {RecipesService} from './recipes.service';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService{
  private postsUrl = 'https://APP_NAME.firebaseio.com/';

  constructor(private http: HttpClient, private recipesService: RecipesService) {}

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.postsUrl + 'recipes.json', recipes)
      .subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.postsUrl + 'recipes.json')
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
