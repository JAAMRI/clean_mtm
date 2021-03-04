import { RouterModule, Routes, NoPreloading } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    pathMatch: "full"
  },
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading, initialNavigation: 'enabled', onSameUrlNavigation: 'reload', useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'});