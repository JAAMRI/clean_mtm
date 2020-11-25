import { NgModule } from '@angular/core';
import { ArticleDetailComponent } from './article-detail.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { WhatAndWhatNotToFreezeComponent } from './articles/what-and-what-not-to-freeze/what-and-what-not-to-freeze.component';
import { JackysDeviledEggsComponent } from './articles/jackys-deviled-eggs/jackys-deviled-eggs.component';



@NgModule({
  declarations: [ArticleDetailComponent, WhatAndWhatNotToFreezeComponent, JackysDeviledEggsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule
  ]
})
export class ArticleDetailModule { }
