import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MtmSliderComponent } from './mtm-slider.component';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [MtmSliderComponent],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [MtmSliderComponent]
})
export class MtmSliderModule { }
