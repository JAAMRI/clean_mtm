import { Routes, RouterModule } from '@angular/router';
import { MyMealsComponent } from './my-meals.component';

const MyMealsRoutes: Routes = [
  {
    path: '',
    component: MyMealsComponent,
  },


];

export const MyMealsRouting = RouterModule.forChild(MyMealsRoutes);
