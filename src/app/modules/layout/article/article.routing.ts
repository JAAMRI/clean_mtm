import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleDetailComponent } from './article-item/article-detail.component';

const ArticleRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ArticleComponent,
      },

      {
        path: ':id',
        component: ArticleDetailComponent,
      },

    ]
  }

];

export const ArticleRouting = RouterModule.forChild(ArticleRoutes);
