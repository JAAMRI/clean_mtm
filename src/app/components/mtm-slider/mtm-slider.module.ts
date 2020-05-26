import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MtmSliderComponent } from './mtm-slider.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [MtmSliderComponent],
  imports: [
    CommonModule,
  ],
  exports: [MtmSliderComponent]
})
export class MtmSliderModule { }
