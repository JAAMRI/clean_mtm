import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { MealItemModule } from '../../../../app/components/meal-item/meal-item.module';
import { SearchBarModule } from '../../../../app/components/search-bar/search-bar.module';
import { UserFormModule } from '../../../components/dialogs/user-form/user-form.module';
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
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ScrollingModule,
    MatIconModule,
    SlickCarouselModule,
    UserFormModule,
    MealDetailModule,
    MatDialogModule
  ],
  providers: [
    MealFavouritesService,
    MealPlanService
  ]
})
export class DiscoverMealsModule { }
