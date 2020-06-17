import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../../guards/auth.guard';

const LayoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [

            {
                path: 'discover',
                canActivate: [AuthGuard],

                loadChildren: () => import('./discover-meals/discover-meals.module').then(m => m.DiscoverMealsModule)
            },
            {
                path: 'favourites',
                canActivate: [AuthGuard],

                loadChildren: () => import('./favourites/favourites.module').then(m => m.FavouritesModule)
            },
            {
                path: 'my-meals',
                canActivate: [AuthGuard],

                loadChildren: () => import('./my-meals/my-meals.module').then(m => m.MyMealsModule)
            },
            {
                path: 'grocery-list',
                canActivate: [AuthGuard],

                loadChildren: () => import('./grocery-list/grocery-list.module').then(m => m.GroceryListModule)
            },

            {
                path: ':id',
                loadChildren: () => import('./meal-detail/meal-detail.module').then(m => m.MealDetailModule)
            },
            {
                path: '**', redirectTo: '/'
            }
        ],
    },
    {
        path: '**', redirectTo: '/'
    }

];

export const LayoutRouting = RouterModule.forChild(LayoutRoutes);
