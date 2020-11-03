import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

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
    component: LayoutComponent,

    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'auth',
    component: LayoutComponent,
    loadChildren: () => import('./modules/layout/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'faqs',
    component: LayoutComponent,

    loadChildren: () => import('./modules/layout/faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'sitemap',
    component: LayoutComponent,

    loadChildren: () => import('./modules/sitemap/sitemap.module').then(m => m.SitemapModule)
  },
  {
    path: 'articles',
    component: LayoutComponent,

    loadChildren: () => import('./modules/layout/article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'download',
    component: LayoutComponent,

    loadChildren: () => import('./modules/layout/download/download.module').then(m => m.DownloadModule)
  },
  {
    path: 'contact-us',
    component: LayoutComponent,

    loadChildren: () => import('./modules/layout/contact-us/contact-us.module').then(m => m.ContactUsModule)
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
