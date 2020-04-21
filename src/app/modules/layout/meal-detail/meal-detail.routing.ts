import { RouterModule, Routes } from '@angular/router';
import { MealDetailComponent } from './meal-detail.component';

const MealDetailRoutes: Routes = [
  {
    path: '',
    component: MealDetailComponent,

  }
];

export const MealDetailRouting = RouterModule.forChild(MealDetailRoutes);
