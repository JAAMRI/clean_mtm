import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../../guards/auth.guard';

const LayoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [

            {
                path: 'discover',
                loadChildren: () => import('./discover-meals/discover-meals.module').then(m => m.DiscoverMealsModule)
            },
            {
                path: 'favourites',
                loadChildren: () => import('./favourites/favourites.module').then(m => m.FavouritesModule)
            },
            {
                path: 'my-meals',
                loadChildren: () => import('./my-meals/my-meals.module').then(m => m.MyMealsModule)
            },
            {
                path: 'grocery-list',
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
