import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleItemComponent } from './article-item/article-item.component';

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
        component: ArticleItemComponent,
      },

    ]
  }

];

export const ArticleRouting = RouterModule.forChild(ArticleRoutes);
