import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRouting } from './article.routing';
import { MatCardModule } from '@angular/material/card';
import { ArticleListItemModule } from '../../../components/article-list-item/article-list-item.module';
import { RouterModule } from '@angular/router';
import { ArticleItemModule } from './article-item/article-item.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRouting,
    MatCardModule,
    ArticleListItemModule,
    RouterModule,
    ArticleItemModule
  ]
})
export class ArticleModule { }
