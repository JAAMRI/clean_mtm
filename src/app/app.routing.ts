import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthGuardService as AuthGuard } from './services/account/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    // component: HomeComponent
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'recipes',
    component: ToolbarComponent,
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
  },
  { path: 'MTM', redirectTo: 'recipes', pathMatch: 'prefix' },//Redirect all MTM requests to recipes
  { path: 'mtm', redirectTo: 'recipes', pathMatch: 'prefix' },//Redirect all mtm requests to recipes => server requires this - case sensitive
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ToolbarComponent,

    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'faqs',
    component: ToolbarComponent,

    loadChildren: () => import('./modules/faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'article',
    component: ToolbarComponent,
    loadChildren: () => import('./modules/article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'contact-us',
    component: ToolbarComponent,

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
