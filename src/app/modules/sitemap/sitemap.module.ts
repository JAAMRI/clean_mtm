import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapComponent } from './sitemap.component';
import { SitemapRouting } from './sitemap.routing';



@NgModule({
  declarations: [SitemapComponent],
  imports: [
    CommonModule,
    SitemapRouting
  ]
})
export class SitemapModule { }
