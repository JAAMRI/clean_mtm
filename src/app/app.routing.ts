import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    // loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'mtm',
    loadChildren: './modules/layout/layout.module#LayoutModule'
  },
  

  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
