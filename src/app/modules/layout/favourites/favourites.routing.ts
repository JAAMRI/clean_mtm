import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './favourites.component';

const FavouritesRoutes: Routes = [
  {
    path: '',
    component: FavouritesComponent,

  },
  {
    path: ':id',
    loadChildren: '../meal-detail/meal-detail.module#MealDetailModule'
  },

];

export const FavouritesRouting = RouterModule.forChild(FavouritesRoutes);
