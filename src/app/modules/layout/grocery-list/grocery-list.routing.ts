import { Routes, RouterModule } from '@angular/router';
import { GroceryListComponent } from './grocery-list/grocery-list.component';

const GroceryListRoutes: Routes = [
  {
    path: '',
    component: GroceryListComponent,
  },
];

export const GroceryListRouting = RouterModule.forChild(GroceryListRoutes);
