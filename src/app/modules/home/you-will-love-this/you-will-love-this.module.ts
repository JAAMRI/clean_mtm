import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MtmSliderModule } from '../../../components/mtm-slider/mtm-slider.module';
import { YouWillLoveThisComponent } from './you-will-love-this.component';

@NgModule({
  declarations: [YouWillLoveThisComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MtmSliderModule
  ],
  exports: [YouWillLoveThisComponent]
})
export class YouWillLoveThisModule { }
