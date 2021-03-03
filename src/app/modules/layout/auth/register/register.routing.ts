import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';


const RegisterRoutes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },

];

export const RegisterRouting = RouterModule.forChild(RegisterRoutes);
