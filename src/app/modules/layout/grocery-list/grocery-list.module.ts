import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceryListRouting } from './grocery-list.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '../../../../app/shared/shared.module';

@NgModule({
  declarations: [GroceryListComponent],
  imports: [
    CommonModule,
    GroceryListRouting,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    ScrollingModule,
    SharedModule
  ]
})
export class GroceryListModule { }
