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
                loadChildren: './contact-us/contact-us.module#ContactUsModule'
            }, {
                path: 'discover',
                loadChildren: './discover-meals/discover-meals.module#DiscoverMealsModule'
            },
            {
                path: 'favourites',
                loadChildren: './favourites/favourites.module#FavouritesModule'
            },
            {
                path: 'my-meals',
                loadChildren: './my-meals/my-meals.module#MyMealsModule'
            },
            {
                path: 'grocery-list',
                loadChildren: './grocery-list/grocery-list.module#GroceryListModule'
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                loadChildren: './profile/profile.module#ProfileModule'
            },
            {
                path: 'faqs',
                loadChildren: './faq/faq.module#FaqModule'
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
