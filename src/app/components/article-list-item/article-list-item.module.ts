import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ArticleListItemComponent } from './article-list-item.component';



@NgModule({
  declarations: [ArticleListItemComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [ArticleListItemComponent]
})
export class ArticleListItemModule { }
