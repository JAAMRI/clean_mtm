import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchBarModule } from '../../../../app/components/search-bar/search-bar.module';
import { MealItemModule } from '../../../components/meal-item/meal-item.module';
import { MyMealsComponent } from './my-meals.component';
import { MyMealsRouting } from './my-meals.routing';

@NgModule({
  declarations: [MyMealsComponent],
  imports: [
    CommonModule,
    MyMealsRouting,
    MealItemModule,
    MatIconModule,
    MatButtonModule,
    SearchBarModule,
    MatDialogModule,
    MatSnackBarModule,
    ScrollingModule
  ],
})
export class MyMealsModule { }
