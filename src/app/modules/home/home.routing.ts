import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)}

];

export const HomeRouting = RouterModule.forChild(HomeRoutes);
