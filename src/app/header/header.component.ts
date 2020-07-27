import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{

  @Output() page = new EventEmitter<string>();
  feature: string;

  onSelect(feature: string){
    this.feature = feature;
    this.page.emit(feature);
  }
}
