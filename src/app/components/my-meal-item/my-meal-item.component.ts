import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-my-meal-item',
  templateUrl: './my-meal-item.component.html',
  styleUrls: ['./my-meal-item.component.scss']
})
export class MyMealItemComponent implements OnInit {
  @Input() mealItem: any;
  @Input() favourited: boolean;
  @Output() wasClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() favouriteToggled: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  mealFavorited = false;
  mealMacros: any = {}
  ngOnInit() {
    this.updateMacros()
  }

  constructor(
    public adobeDtbTracking: AdobeDtbTracking
  ) { }

  updateMacros() {
    if (this.mealItem.nutrition instanceof Array) {
      this.mealMacros['fat'] = this.mealItem.nutrition.find(n => n.name === 'Total Fat').value
      this.mealMacros['carbs'] = this.mealItem.nutrition.find(n => n.name === 'Total Carbs').value
      this.mealMacros['calories'] = this.mealItem.nutrition.find(n => n.name === 'Calories').value
    } else {//This happens when recommended recipes are added to favourites => SCM API doesn't provide nutrition data for recommended recipes
      this.mealMacros['fat'] = '?';
      this.mealMacros['carbs'] = '?';
      this.mealMacros['calories'] = '?';
    }
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
    this.wasClicked.emit(this.mealItem);
    this.adobeDtbTracking.anchor_link_meal('On Meal Plan page, Viewing Meal Detail for: ', this.mealItem.title);
  }

  removeMeal() {
    this.remove.emit(this.mealItem.id);
    this.adobeDtbTracking.anchor_link_meal('Removing meal from mealplan: ', this.mealItem.title);
  }
}
