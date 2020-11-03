import { NgModule } from '@angular/core';
import { ArticleItemComponent } from './article-item.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ArticleItemComponent],
  imports: [
    CommonModule
  ],
  exports: [ArticleItemComponent]
})
export class ArticleItemModule { }
