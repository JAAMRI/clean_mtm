import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FeaturedRecipes, getFeaturedRecipes } from './featured-recipes';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  @Output() navigate = new EventEmitter();
  @Input() isMobile: boolean;
  isFrench = this.locale === 'fr';
  recipes: any[] = [];
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    this.recipes = getFeaturedRecipes(this.locale)
  }

  get shopMealImage() {
    return this.isFrench ? '/assets/static_images/home-page/fr/Shop_Meal_Image.jpg' : '/assets/static_images/home-page/Shop_Meal_Image.jpg';
  }

  get createMealImage() {
    return this.isFrench ? '/assets/static_images/home-page/fr/Create_Meal_Image.jpg' : '/assets/static_images/home-page/Create_Meal_Image.jpg';
  }

  emitNavigation(recipeLink?: string) {
    this.navigate.emit(recipeLink);
  }

  pushEnd() {
    this.recipes = [...this.recipes, ...getFeaturedRecipes(this.locale)]
  }

  pushStart() {
    this.recipes = [ ...getFeaturedRecipes(this.locale), ...this.recipes]
  }

  trackByIndex(i: number) {
    return i;
  }

}
