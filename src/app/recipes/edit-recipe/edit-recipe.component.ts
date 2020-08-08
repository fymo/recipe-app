import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {map} from 'rxjs/operators';
import * as RecipesActions from '../store/recipes.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params) => {
          this.id = +params.id;
          this.editMode = params.id != null;
          this.initForm();
        }
      );
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(
        map(recipeState => recipeState.recipes.find((r, index) => {
          return index === this.id;
        }))
      ).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImage = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredients) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
      });

    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredeint(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onSubmit(): void {
    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, recipe: this.recipeForm.value}));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }

    this.recipeForm.reset();
    this.editMode = false;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
      this.storeSub = null;
    }
  }
}
