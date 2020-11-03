import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export enum MTMPageNames {
  SELECT_MEALS = 'SELECT RECIPES',
  FAVOURITES = 'FAVOURITES',
  MEAL_PLAN = 'MEAL PLAN',
  GROCERY_LIST = 'GROCERY LIST',
  VIEW_PROFILE = 'VIEW PROFILE',
  CONTACT_US = 'CONTACT US',
  FAQs = 'FAQs',
  HOME = 'HOME',
  AUTH = 'AUTH',
  ARTICLES = 'ARTICLES'
}

export interface MTMPage {

  name: string;
  route: string;
  title?: string;
  description?: string;
  image?: string;

}

export const MTMPages: { [name: string]: MTMPage } = {
  'HOME': {
    name: 'HOME',
    route: '/',
    title: 'Meal Prep & Weekly Meal Planner | Meals That Matter',
    description: 'Welcome to the all-in-one meal preparation tool, where you can choose from a wide range of seasonal and flavorful recipes to take your meal prep for the week to a whole new level!',
    image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',

  },
  'SELECT RECIPES': {
    name: 'SELECT RECIPES',
    route: '/recipes/discover',
    title: 'Choose Your Weekly Meals | Meals That Matter',
    description: 'Choose your meals for the week and take your meal prep to the next level. Select from a wide range of amazing recipes, curated by our Knorr Chefs.',
    image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
  },
  'FAVOURITES': {
    name: 'FAVOURITES',
    route: '/recipes/favourites',
  },
  'MEAL PLAN': {
    name: 'MEAL PLAN',
    route: '/recipes/my-meals'
  },
  'GROCERY LIST': {
    name: 'GROCERY LIST',
    route: '/recipes/grocery-list'
  },
  'VIEW PROFILE': {
    name: 'VIEW PROFILE',
    route: '/profile'
  },
  'CONTACT US': {
    name: 'CONTACT US',
    route: '/contact-us'
  },
  'FAQs': {
    name: 'FAQs',
    route: '/faqs'
  },
  'ARTICLES': {
    name: 'ARTICLES',
    route: '/articles'
  },

  'AUTH': {
    name: 'AUTH',
    route: '/auth'
  }
}

@Component({
  selector: 'app-desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.component.scss']
})
export class DesktopToolbarComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();
  @Output() onAuthClicked = new EventEmitter<string>();
  @Output() onSignOutClicked = new EventEmitter<string>();
  @Input() activePage: string;
  @Input() loggedIn: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  emitNavigation(link: string) {
    this.navigate.emit(link);
  }

  authClicked() {
    this.onAuthClicked.emit();
  }

  signOut() {
    this.onSignOutClicked.emit();
  }

}
