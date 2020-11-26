import { NgModule } from '@angular/core';
import { ArticleDetailComponent } from './article-detail.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { WhatAndWhatNotToFreezeComponent } from './articles/what-and-what-not-to-freeze/what-and-what-not-to-freeze.component';
import { JackysDeviledEggsComponent } from './articles/jackys-deviled-eggs/jackys-deviled-eggs.component';
import { KimiasMeatballWrapComponent } from './articles/kimias-meatball-wrap/kimias-meatball-wrap.component';
import { RouterModule } from '@angular/router';
import { KirbysMacaroniSaladComponent } from './articles/kirbys-macaroni-salad/kirbys-macaroni-salad.component';



@NgModule({
  declarations: [ArticleDetailComponent, WhatAndWhatNotToFreezeComponent, JackysDeviledEggsComponent, KimiasMeatballWrapComponent, KirbysMacaroniSaladComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    RouterModule
  ]
})
export class ArticleDetailModule { }
