import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MULTIVITAMINS, DAILYVALUES, MACROPROPERTIES } from '../../utilities/nutrition-helper';

@Component({
  selector: 'app-nutrition-table',
  templateUrl: './nutrition-table.component.html',
  styleUrls: ['./nutrition-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NutritionTableComponent implements OnInit {
  @Input() nutritionFacts: any;
  mappedNutrition: any;
  mappedVitamins: any;
  caloricInfo: any;
  multivitamins = MULTIVITAMINS;
  dailyValues = DAILYVALUES;
  macroProperties = MACROPROPERTIES;

  constructor() { }

  ngOnInit() {
    if (this.nutritionFacts) {
      this.caloricInfo = this.nutritionFacts.find((nutrition) => nutrition.name === 'Calories');
      this.mappedNutrition = this.nutritionFactMapper();
      this.mappedVitamins = this.vitaminFactMapper();
    }
  }


  isMultivitamin(element: string) {
    return this.multivitamins.indexOf(element) !== -1;
  }

  isMacroProperty(element: string) {
    return this.macroProperties.indexOf(element) !== -1;
  }

  nutritionFactMapper() {
    this.nutritionFacts.forEach((nutrition: any) => {
      if (this.isMacroProperty(nutrition.name)) {
        nutrition.isMacroProperty = true;
      }
    });
    return this.nutritionFacts.filter((nutrition) =>
      !this.isMultivitamin(nutrition.name) && (nutrition.name !== 'Calories')
    );
  }

  vitaminFactMapper() {
    return this.nutritionFacts.filter((nutrition: any) => this.isMultivitamin(nutrition.name) || nutrition.name.includes('Vitamin'));
  }

}
