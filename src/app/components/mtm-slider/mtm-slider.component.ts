import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mtm-slider',
  templateUrl: './mtm-slider.component.html',
  styleUrls: ['./mtm-slider.component.scss'],
})

export class MtmSliderComponent {
  @ViewChild('slider', { static: true }) slider: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    const scrollbarWidth = this.slider.nativeElement.offsetWidth;
    const sliderWidth = this.slider.nativeElement.scrollWidth

    // scroll half way, but come back half way of the scroll bar to have it in the middle (16 accounted for the 1em grid gap)
    this.slider.nativeElement.scrollLeft = ( (sliderWidth/ 2) - ( scrollbarWidth/2)-8); 
  }



}
