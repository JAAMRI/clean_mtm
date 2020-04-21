import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SearchBarModule } from '../../../../app/components/search-bar/search-bar.module';
import { UserFormModule } from '../../../components/dialogs/user-form/user-form.module';
import { MyMealItemModule } from '../../../components/my-meal-item/my-meal-item.module';
import { MyMealsComponent } from './my-meals.component';
import { MyMealsRouting } from './my-meals.routing';

@NgModule({
  declarations: [MyMealsComponent],
  imports: [
    CommonModule,
    MyMealsRouting,
    MyMealItemModule,
    MatIconModule,
    MatButtonModule,
    SearchBarModule,
    MatDialogModule,
    MatSnackBarModule,
    UserFormModule,
    ScrollingModule,
    SlickCarouselModule,
  ],
})
export class MyMealsModule { }
