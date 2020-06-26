import { Component, Input, EventEmitter, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { Meal } from '../../interfaces/meal/meal';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MealItemComponent implements OnInit {
  @Input() mealItem: any; // actual recipe item
  @Input() recommendedMeal: boolean;
  @Input() inMealPlan: boolean; // check if in meal plan
  @Input() favourited: boolean; // check if favourites
  @Output() wasClicked: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() favouriteToggled: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  @Input() parent: string;
  showDescription: boolean;
  mealMacros: any = {};
  constructor() { }

  ngOnInit() {
    this.updateMacros();
    this.showDescription= (this.parent !== "favourites" ) && (this.parent !== "recipe-detail")
  }

  

  updateMacros() {
    if (this.mealItem.nutrition instanceof Array) {
      this.mealMacros['fat'] = this.mealItem.nutrition.find(n => n.name === 'Total Fat')?.value
      this.mealMacros['carbs'] = this.mealItem.nutrition.find(n => n.name === 'Total Carbs')?.value
      this.mealMacros['calories'] = this.mealItem.nutrition.find(n => n.name === 'Calories')?.value
    } else {//This happens when recommended recipes are added to favourites => SCM API doesn't provide nutrition data for recommended recipes
      this.mealMacros['fat'] = '?';
      this.mealMacros['carbs'] = '?';
      this.mealMacros['calories'] = '?';
    }
  }


  addToMealPlan(event: any) {
    event.stopPropagation();

    this.add.emit(this.mealItem.id);
  }

  removeFromMealPlan(event: any) {
    event.stopPropagation();

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
