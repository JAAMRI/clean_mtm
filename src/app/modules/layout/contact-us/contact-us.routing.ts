import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';

const ContactUsRoutes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
  },

];

export const ContactUsRouting = RouterModule.forChild(ContactUsRoutes);
