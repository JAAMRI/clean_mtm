import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },

];

export const ProfileRouting = RouterModule.forChild(ProfileRoutes);
