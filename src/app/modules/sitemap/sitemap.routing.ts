import { RouterModule, Routes } from '@angular/router';
import {SitemapComponent } from './sitemap.component';

const sitemapRoutes: Routes = [
  {
    path: '',
    component:SitemapComponent
  },

];

export const SitemapRouting = RouterModule.forChild(sitemapRoutes);
