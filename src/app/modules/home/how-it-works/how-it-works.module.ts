import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MtmSliderModule } from '../../../components/mtm-slider/mtm-slider.module';
import { HowItWorksComponent } from './how-it-works.component';

@NgModule({
  declarations: [HowItWorksComponent],
  imports: [
    CommonModule,
    MtmSliderModule
  ],
  exports: [HowItWorksComponent]
})
export class HowItWorksModule { }
