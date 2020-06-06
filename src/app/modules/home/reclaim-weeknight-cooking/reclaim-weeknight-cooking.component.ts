import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reclaim-weeknight-cooking',
  templateUrl: './reclaim-weeknight-cooking.component.html',
  styleUrls: ['./reclaim-weeknight-cooking.component.scss']
})
export class ReclaimWeeknightCookingComponent  {
  @Output() navigate: EventEmitter<void> = new EventEmitter();

  constructor(
  ) { }

  emitNavigation() {
    this.navigate.emit();
  }


  
}
