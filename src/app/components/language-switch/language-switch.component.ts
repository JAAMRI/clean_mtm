import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mtm-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})

export class LanguageSwitchComponent implements OnInit {

  @Input() isInPopup: boolean = false;
  @Input() idMeal: string = null;
  currentLanguage: Locale = Locale.EN; 

  get locale(): typeof Locale {
    return Locale;
  }

  constructor(private location: Location) { }

  ngOnInit() { }

  languageChanged() {
    const newDomain = locales.find(l => l.Id === this.currentLanguage).Redirect;
    let currentRoute = this.location.path();

    if (this.isInPopup) { 
      currentRoute += "?dialog=true&id=" + this.idMeal;
    }

    console.log(newDomain + (this.routeIsException(currentRoute) ? "" : currentRoute));
    //window.location.href = domain + (this.routeIsException(currentRoute) ? "" : currentRoute);
  }

  private routeIsException(route: string): boolean {
    let redirectToRoot = false;
    exceptions.forEach(e => {
      if (route.includes(e)) { redirectToRoot = true; return; }
    });

    return redirectToRoot;
  }
}

enum Locale { EN = 1, FR };

class LocaleLink {
  Id: Locale;
  Redirect: string;
};

const locales: LocaleLink[] = [
  { Id: Locale.EN, Redirect: "http://www.mealsthatmatter.com" },
  { Id: Locale.FR, Redirect: "http://www.chaquerepascompte.com" }
];

// The slash is mandatory to allow the articles pages, but not subpages
const exceptions: string[] = [
  "articles/"
];
