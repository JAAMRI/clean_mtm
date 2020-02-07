import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss']
})
export class MealItemComponent {
  @Input() mealItem: any; // actual recipe item
  @Input() recommendedMeal: boolean;
  @Input() inMealPlan: boolean; // check if in meal plan
  @Input() favourited: boolean; // check if favourites
  @Output() wasClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() favouriteToggled: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  constructor() { }

  addToMealPlan() {
    this.add.emit(this.mealItem.id);
  }

  removeFromMealPlan() {
    this.remove.emit(this.mealItem.id);
  }

  toggleFavorite(event: any) {
    event.stopPropagation();
    this.favouriteToggled.emit(this.mealItem);
  }
  viewMealDetail() {
    this.wasClicked.emit(this.mealItem);
  }
}
