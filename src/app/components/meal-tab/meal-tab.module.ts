import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MealTabComponent } from './meal-tab.component';

@NgModule({
  declarations: [MealTabComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MealTabComponent]
})
export class MealTabModule { }
