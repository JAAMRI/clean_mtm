import { NgModule } from '@angular/core';
import { ArticleDetailComponent } from './article-detail.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';



@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ArticleDetailModule { }
