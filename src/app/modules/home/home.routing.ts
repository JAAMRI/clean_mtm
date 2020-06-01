import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

];

export const HomeRouting = RouterModule.forChild(HomeRoutes);
