import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { LanguageSwitchModule } from 'src/app/components/language-switch/language-switch.module';
import { MealTabModule } from '../../../../app/components/meal-tab/meal-tab.module';
import { NutritionTableModule } from '../../../../app/components/nutrition-table/nutrition-table.module';
import { SharedModule } from '../../../../app/shared/shared.module';
import { MealItemModule } from '../../../components/meal-item/meal-item.module';
import { MtmSliderModule } from '../../../components/mtm-slider/mtm-slider.module';
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
    NutritionTableModule,
    MatProgressSpinnerModule,
    SharedModule,
    MtmSliderModule,
    MealItemModule,
    RouterModule,
    LanguageSwitchModule
    
  ],
  entryComponents: [MealDetailComponent],
  providers: [{ provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },]
})
export class MealDetailModule { }
