import { RouterModule, Routes } from '@angular/router';
import { DiscoverMealsComponent } from '../discover-meals/discover-meals.component';

const DiscoverMealsRoutes: Routes = [
  {
    path: '',
    component: DiscoverMealsComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('../meal-detail/meal-detail.module').then(m => m.MealDetailModule)
  },

];

export const DiscoverMealsRouting = RouterModule.forChild(DiscoverMealsRoutes);
