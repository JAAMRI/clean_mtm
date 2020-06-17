import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq.component';

const FaqRoutes: Routes = [
  {
    path: '',
    component: FaqComponent,

  },
];

export const FaqRouting = RouterModule.forChild(FaqRoutes);
