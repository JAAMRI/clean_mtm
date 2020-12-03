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
  recipes = FeaturedRecipes;
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
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
