import { Component, EventEmitter, Output } from '@angular/core';
import { Breadcrumb } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  @Output() navigate = new EventEmitter();
  @Output() toggle = new EventEmitter();
  breadcrumbs: Breadcrumb[] = [{
    name: 'Select Meals',
    active: false
  },
  {
    name: 'Meal Plan',
    active: false
  },
  {
    name: 'Grocery List',
    active: false
  }];

  emitNavigation() {
    this.navigate.emit();
  }

  emitToggle() {
    this.toggle.emit();
  }



}
