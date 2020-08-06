import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/model/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) slForm: NgForm;
  private subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({name: this.editItem.name, amount: this.editItem.amount});
    });
  }

  onSaveItem(form: NgForm): void {

    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
}
