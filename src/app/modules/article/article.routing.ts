import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';

const ArticleRoutes: Routes = [
  {
    path: '',
    component: ArticleComponent,
  },

];

export const ArticleRouting = RouterModule.forChild(ArticleRoutes);
