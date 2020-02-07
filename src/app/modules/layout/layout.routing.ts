import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../../app/services/account/auth-guard.service';
import { LayoutComponent } from './layout.component';

const LayoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'contact-us',
                loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
            }, {
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
                path: 'profile',
                canActivate: [AuthGuard],
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'faqs',
                loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule)
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
