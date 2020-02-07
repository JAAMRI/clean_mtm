import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NutritionTableComponent } from './nutrition-table.component';

@NgModule({
  declarations: [NutritionTableComponent],
  imports: [
    CommonModule,
  ],
  exports: [NutritionTableComponent]
})
export class NutritionTableModule { }
