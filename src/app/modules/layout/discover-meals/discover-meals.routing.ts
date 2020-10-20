import { RouterModule, Routes } from '@angular/router';
import { DiscoverMealsComponent } from '../discover-meals/discover-meals.component';

const DiscoverMealsRoutes: Routes = [
  {
    path: '',
    component: DiscoverMealsComponent,
  },
  {
    path: ':filter',
    component: DiscoverMealsComponent,
  }


];

export const DiscoverMealsRouting = RouterModule.forChild(DiscoverMealsRoutes);
