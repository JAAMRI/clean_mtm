import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

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
  { path: 'MTM', redirectTo: 'recipes', pathMatch: 'prefix'},//Redirect all MTM requests to recipes
  { path: 'mtm', redirectTo: 'recipes', pathMatch: 'prefix'},//Redirect all mtm requests to recipes => server requires this - case sensitive
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRouting { }
