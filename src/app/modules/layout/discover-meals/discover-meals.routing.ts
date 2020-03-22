import { RouterModule, Routes } from '@angular/router';
import { DiscoverMealsComponent } from '../discover-meals/discover-meals.component';

const DiscoverMealsRoutes: Routes = [
  {
    path: '',
    component: DiscoverMealsComponent,
  },
 

];

export const DiscoverMealsRouting = RouterModule.forChild(DiscoverMealsRoutes);
