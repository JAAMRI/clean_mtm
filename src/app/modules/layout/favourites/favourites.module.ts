import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchBarModule } from '../../../../app/components/search-bar/search-bar.module';
import { MealItemModule } from '../../../components/meal-item/meal-item.module';
import { FavouritesComponent } from './favourites.component';
import { FavouritesRouting } from './favourites.routing';

@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    FavouritesRouting,
    MealItemModule,
    MatIconModule,
    MatButtonModule,
    SearchBarModule,
    MatDialogModule,
    MatSnackBarModule,
    ScrollingModule,
    MealItemModule
  ]
})

export class FavouritesModule { }
