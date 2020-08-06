import {NgModule} from '@angular/core';
import {AlertComponent} from './alert/alert.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {DropdownDirective} from './directives/dropdown.directive';
import {PlaceholderDirective} from './directives/placeholder.directive';
import {AuthComponent} from '../auth/auth.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
    CommonModule
  ]
})
export class SharedModule {}
