import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },

    ]
  },

];

export const AuthRouting = RouterModule.forChild(AuthRoutes);
