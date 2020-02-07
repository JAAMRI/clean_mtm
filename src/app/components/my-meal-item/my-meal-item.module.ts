import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../app/shared/shared.module';
import { MyMealItemComponent } from './my-meal-item.component';

@NgModule({
  declarations: [MyMealItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  exports: [MyMealItemComponent]
})
export class MyMealItemModule { }
