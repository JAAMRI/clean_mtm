import { RouterModule, Routes } from '@angular/router';
import { DownloadComponent } from './download.component';

const DownloadRoutes: Routes = [
  {
    path: '',
    component: DownloadComponent,

  },
];

export const DownloadRouting = RouterModule.forChild(DownloadRoutes);
