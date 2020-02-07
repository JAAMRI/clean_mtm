import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteMealComponent } from './favourite-meal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from '../../../app/pipes/pipes.module';

@NgModule({
  declarations: [FavouriteMealComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    PipesModule,
    MatProgressSpinnerModule
  ],
  exports: [FavouriteMealComponent]
})
export class FavouriteMealModule { }
