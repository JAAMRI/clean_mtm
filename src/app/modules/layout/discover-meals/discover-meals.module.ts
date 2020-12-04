import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FilterModule } from 'src/app/components/dialogs/filter/filter.module';
import { MealItemModule } from '../../../../app/components/meal-item/meal-item.module';
import { SearchBarModule } from '../../../../app/components/search-bar/search-bar.module';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { MtmSliderModule } from '../../../components/mtm-slider/mtm-slider.module';
import { DiscoverMealsComponent } from './discover-meals.component';
import { DiscoverMealsRouting } from './discover-meals.routing';

@NgModule({
  declarations: [DiscoverMealsComponent],
  imports: [
    CommonModule,
    MealItemModule,
    MatButtonModule,
    SearchBarModule,
    MatIconModule,
    MatDialogModule,
    MtmSliderModule,
    HttpClientModule,
    FilterModule,
    DiscoverMealsRouting,
  ],
  providers: [
    MealFavouritesService,
    MealPlanService
  ]
})
export class DiscoverMealsModule { }
