import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-favourite-meal',
  templateUrl: './favourite-meal.component.html',
  styleUrls: ['./favourite-meal.component.scss']
})
export class FavouriteMealComponent {

  @Input() mealItem: any; // the meal
  @Input() inMealPlan: boolean; // whether meal is in meal plan
  @Input() favourited: boolean; // whether or not meal is in favourites
  @Input() recommendedMeal: boolean; // use this component for recommended meal as well
  @Output() wasClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() add: EventEmitter<string> = new EventEmitter(); // emitter to add meal to mealplan
  @Output() remove: EventEmitter<string> = new EventEmitter();// emitter to remove meal from mealplan
  @Output() favouriteToggled: EventEmitter<any> = new EventEmitter(); // emitter to toggle favourite

  constructor(
    public adobeDtbTracking: AdobeDtbTracking
  ) { }

  addToMealPlan() {
    this.add.emit(this.mealItem);
  }

  removeFromMealPlan() {
    this.remove.emit(this.mealItem.id);
  }


  toggleFavorite(event: any) {
    event.stopPropagation();
    this.favouriteToggled.emit(this.mealItem);
    if (this.favourited) {
      this.adobeDtbTracking.anchor_link_meal('Removing meal from favourite: ', this.mealItem.title);
    } else {
      this.adobeDtbTracking.anchor_link_meal('Adding meal to favourite: ', this.mealItem.title);
    }
  }

  viewMealDetail() {
    // tell parent to route to recipe page
    this.wasClicked.emit(this.mealItem);
    this.adobeDtbTracking.anchor_link_meal('Viewing Meal Detail for: ', this.mealItem.title);
  }
}
