import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';


const ForgotPasswordRoutes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
  },

];

export const ForgotPasswordRouting = RouterModule.forChild(ForgotPasswordRoutes);
