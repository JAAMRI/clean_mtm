import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FeaturedRecipes } from './featured-recipes';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  @Output() navigate = new EventEmitter();

  recipes = FeaturedRecipes;
  constructor( 
    
  ) {}

  ngOnInit(): void {
  }

  emitNavigation(recipeLink?: string) {
    this.navigate.emit(recipeLink);
  }

  pushEnd() {
    console.log('adding')
    this.recipes = [...this.recipes, ...FeaturedRecipes]
  }

  pushStart() {
    console.log('adding')
    this.recipes = [ ...FeaturedRecipes, ...this.recipes]
  }

  trackByIndex(i: number) {
    return i;
  }

}
