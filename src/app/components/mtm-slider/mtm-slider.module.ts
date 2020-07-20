import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MtmSliderComponent } from './mtm-slider.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [MtmSliderComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [MtmSliderComponent]
})
export class MtmSliderModule { }
