import { Component, Output, EventEmitter } from '@angular/core';
import { STOCK_IMAGE } from '../../../utilities/global-constants';

@Component({
  selector: 'app-reclaim-weeknight-cooking',
  templateUrl: './reclaim-weeknight-cooking.component.html',
  styleUrls: ['./reclaim-weeknight-cooking.component.scss']
})
export class ReclaimWeeknightCookingComponent  {
  stockImage = STOCK_IMAGE;
  @Output() navigate: EventEmitter<void> = new EventEmitter();

  constructor(
  ) { }

  emitNavigation() {
    this.navigate.emit();
  }


  
}
