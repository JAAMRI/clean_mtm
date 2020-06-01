import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },

];

export const AuthRouting = RouterModule.forChild(AuthRoutes);
