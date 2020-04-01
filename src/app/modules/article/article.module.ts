import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRouting } from './article.routing';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRouting,
    MatCardModule
  ]
})
export class ArticleModule { }
