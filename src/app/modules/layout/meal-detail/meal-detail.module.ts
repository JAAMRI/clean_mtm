import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UserFormModule } from '../../../../app/components/dialogs/user-form/user-form.module';
import { FavouriteMealModule } from '../../../../app/components/favourite-meal/favourite-meal.module';
import { NutritionTableModule } from '../../../../app/components/nutrition-table/nutrition-table.module';
import { SharedModule } from '../../../../app/shared/shared.module';
import { MealTabModule } from '../../../../app/components/meal-tab/meal-tab.module';
import { MealDetailComponent } from './meal-detail.component';
import { MealDetailRouting } from './meal-detail.routing';

@NgModule({
  declarations: [MealDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MealDetailRouting,
    MatTabsModule,
    MealTabModule,
    FavouriteMealModule, // import this to use this component for recommended meals
    NutritionTableModule,
    SlickCarouselModule,
    MatProgressSpinnerModule,
    UserFormModule,
    SharedModule
  ],
  entryComponents: [MealDetailComponent],
  exports: [MealDetailComponent],
  providers: [{ provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },]
})
export class MealDetailModule { }
