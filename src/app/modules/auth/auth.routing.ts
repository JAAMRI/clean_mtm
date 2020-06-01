import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const HomeRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },

];

export const HomeRouting = RouterModule.forChild(HomeRoutes);
