import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';


const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

];

export const LoginRouting = RouterModule.forChild(LoginRoutes);
