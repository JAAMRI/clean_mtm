import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './favourites.component';

const FavouritesRoutes: Routes = [
  {
    path: '',
    component: FavouritesComponent,

  },
  {
    path: ':id',
    loadChildren: () => import('../meal-detail/meal-detail.module').then(m => m.MealDetailModule)
  },

];

export const FavouritesRouting = RouterModule.forChild(FavouritesRoutes);
