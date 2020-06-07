import { Component, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mtm-slider',
  templateUrl: './mtm-slider.component.html',
  styleUrls: ['./mtm-slider.component.scss'],
})

export class MtmSliderComponent {
  @ViewChild('slider', { static: true }) slider: ElementRef;
  @Output() onEndReached = new EventEmitter();
  @Output() onStartReached = new EventEmitter();
  initialScrollWidth;

  constructor() { }

  @HostListener('scroll', ['$event'])
  onElementScroll(event: any) {
     if (event.target.scrollLeft === 0) {
      this.onStartReached.emit();
      console.log(this.initialScrollWidth)
      setTimeout(() => {
        this.slider.nativeElement.scrollLeft =  this.initialScrollWidth;
      }, 1)

    } else if (event.target.scrollLeft + event.target.offsetWidth === this.slider.nativeElement.scrollWidth) {
      this.onEndReached.emit();
    }

  }

  ngAfterViewInit() {
    const scrollbarWidth = this.slider.nativeElement.offsetWidth;
    const sliderWidth = this.slider.nativeElement.scrollWidth
    this.initialScrollWidth = sliderWidth;
    // scroll half way, but come back half way of the scroll bar to have it in the middle (16 accounted for the 1em grid gap)
    this.slider.nativeElement.scrollLeft = ((sliderWidth / 2) - (scrollbarWidth / 2) - 8);
  }



}
