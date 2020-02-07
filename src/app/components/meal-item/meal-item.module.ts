import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../app/shared/shared.module';
import { MealItemComponent } from './meal-item.component';

@NgModule({
  declarations: [MealItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ],
  exports: [MealItemComponent]
})
export class MealItemModule { }
