import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-reclaim-weeknight-cooking',
  templateUrl: './reclaim-weeknight-cooking.component.html',
  styleUrls: ['./reclaim-weeknight-cooking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReclaimWeeknightCookingComponent  {
  @Output() navigate: EventEmitter<void> = new EventEmitter();

  constructor(
  ) { }

  emitNavigation() {
    this.navigate.emit();
  }


  
}
