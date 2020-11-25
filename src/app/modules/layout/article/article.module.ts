import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ArticleListItemModule } from '../../../components/article-list-item/article-list-item.module';
import { ArticleDetailModule } from './article-item/article-detail.module';
import { ArticleComponent } from './article.component';
import { ArticleRouting } from './article.routing';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRouting,
    MatCardModule,
    ArticleListItemModule,
    RouterModule,
    ArticleDetailModule
  ]
})
export class ArticleModule { }
