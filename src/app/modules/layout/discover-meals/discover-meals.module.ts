import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MealItemModule } from '../../../../app/components/meal-item/meal-item.module';
import { SearchBarModule } from '../../../../app/components/search-bar/search-bar.module';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { FilterModule } from '../../../components/dialogs/filter/filter.module';
import { MtmSliderModule } from '../../../components/mtm-slider/mtm-slider.module';
import { MealDetailModule } from '../meal-detail/meal-detail.module';
import { DiscoverMealsComponent } from './discover-meals.component';
import { DiscoverMealsRouting } from './discover-meals.routing';

@NgModule({
  declarations: [DiscoverMealsComponent],
  imports: [
    CommonModule,
    MealItemModule,
    MatButtonModule,
    SearchBarModule,
    DiscoverMealsRouting,
    MatIconModule,
    MatDialogModule,
    MtmSliderModule,
    FilterModule,
    MealDetailModule,
    HttpClientModule
  ],
  providers: [
    MealFavouritesService,
    MealPlanService
  ]
})
export class DiscoverMealsModule { }
