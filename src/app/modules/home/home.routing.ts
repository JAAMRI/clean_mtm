import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from '../../../app/components/forgot-password/forgot-password.component';
import { HomeComponent } from './home.component';

const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {path: 'login', component: HomeComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},

];

export const HomeRouting = RouterModule.forChild(HomeRoutes);
