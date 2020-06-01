import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/account/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    // component: HomeComponent
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
  },
  { path: 'MTM', redirectTo: 'recipes', pathMatch: 'prefix' },//Redirect all MTM requests to recipes
  { path: 'mtm', redirectTo: 'recipes', pathMatch: 'prefix' },//Redirect all mtm requests to recipes => server requires this - case sensitive
  {
    path: 'profile',
    canActivate: [AuthGuard],

    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  {
    path: 'faqs',

    loadChildren: () => import('./modules/faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./modules/article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'download',
    loadChildren: () => import('./modules/download/download.module').then(m => m.DownloadModule)
  },
  {
    path: 'contact-us',

    loadChildren: () => import('./modules/contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRouting { }
