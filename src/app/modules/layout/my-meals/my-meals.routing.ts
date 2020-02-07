import { Routes, RouterModule } from '@angular/router';
import { MyMealsComponent } from './my-meals.component';

const MyMealsRoutes: Routes = [
  {
    path: '',
    component: MyMealsComponent,
  },
  {
    path: ':id',
    loadChildren: '../meal-detail/meal-detail.module#MealDetailModule'
  },

];

export const MyMealsRouting = RouterModule.forChild(MyMealsRoutes);
