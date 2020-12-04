import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../../guards/auth.guard';

const LayoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [

            // {
            //     path: 'discover',
            //     canActivate: [AuthGuard],

            //     loadChildren: () => import('./discover-meals/discover-meals.module').then(m => m.DiscoverMealsModule)
            // },
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
                path: 'profile',
                canActivate: [AuthGuard],
                loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'auth',
                loadChildren: () => import('../layout/auth/auth.module').then(m => m.AuthModule)
            },

            {
                path: 'faqs',
                loadChildren: () => import('../layout/faq/faq.module').then(m => m.FaqModule)
            },
            {
                path: 'sitemap',
                loadChildren: () => import('../sitemap/sitemap.module').then(m => m.SitemapModule)
            },
            {
                path: 'articles',
                loadChildren: () => import('../layout/article/article.module').then(m => m.ArticleModule)
            },
            {
                path: 'download',
                loadChildren: () => import('../layout/download/download.module').then(m => m.DownloadModule)
            },
            {
                path: 'contact-us',
                loadChildren: () => import('../layout/contact-us/contact-us.module').then(m => m.ContactUsModule)
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
