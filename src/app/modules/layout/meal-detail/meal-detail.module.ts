import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { NutritionTableModule } from '../../../../app/components/nutrition-table/nutrition-table.module';
import { SharedModule } from '../../../../app/shared/shared.module';
import { MealTabModule } from '../../../../app/components/meal-tab/meal-tab.module';
import { MealDetailComponent } from './meal-detail.component';
import { MealDetailRouting } from './meal-detail.routing';
import { MtmSliderModule } from '../../../components/mtm-slider/mtm-slider.module';
import { MealItemModule } from '../../../components/meal-item/meal-item.module';
import { RouterModule } from '@angular/router';

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
    NutritionTableModule,
    MatProgressSpinnerModule,
    SharedModule,
    MtmSliderModule,
    MealItemModule,
    RouterModule
  ],
  entryComponents: [MealDetailComponent],
  exports: [MealDetailComponent],
  providers: [{ provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },]
})
export class MealDetailModule { }
