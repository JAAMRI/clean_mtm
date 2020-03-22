import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './favourites.component';

const FavouritesRoutes: Routes = [
  {
    path: '',
    component: FavouritesComponent,

  },

];

export const FavouritesRouting = RouterModule.forChild(FavouritesRoutes);
