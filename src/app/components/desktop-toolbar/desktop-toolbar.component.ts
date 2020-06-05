import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export enum MTMPageNames {
  SELECT_MEALS = 'SELECT MEALS',
  FAVOURITES = 'FAVOURITES',
  MEAL_PLAN = 'MEAL PLAN',
  GROCERY_LIST = 'GROCERY LIST',
  VIEW_PROFILE = 'VIEW PROFILE',
  CONTACT_US = 'CONTACT US',
  FAQs = 'FAQs',
  HOME = 'HOME',
  AUTH = 'AUTH'
}

export const MTMPages = {
  'SELECT MEALS': {
    name: 'SELECT MEALS',
    route: '/recipes/discover'
  },
  'FAVOURITES': {
    name: 'FAVOURITES',
    route: '/recipes/favourites'
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
  'HOME': {
    name: 'HOME',
    route: '/'
  },
  'Auth': {
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
