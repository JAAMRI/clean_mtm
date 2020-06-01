import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
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

  emitNavigation(recipeLink: string) {
    this.navigate.emit(recipeLink);
  }

}
