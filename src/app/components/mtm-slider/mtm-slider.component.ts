import { Component, ElementRef, ViewChild, HostListener, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-mtm-slider',
  templateUrl: './mtm-slider.component.html',
  styleUrls: ['./mtm-slider.component.scss'],
})

export class MtmSliderComponent implements AfterViewInit, OnChanges {
  @ViewChild('slider', { static: true }) slider: ElementRef;
  @Input() numOfItems: number;
  @Input() offset: number;
  @Input() showArrows: boolean = false;
  @Input() scrollDistance: number = 0;
  @Output() onEndReached = new EventEmitter();
  @Output() onStartReached = new EventEmitter();
  @Output() onRightClicked = new EventEmitter();
  @Output() onLeftClicked = new EventEmitter();
  initialScrollWidth: number;
  smoothScroll = true;
  lastSideReached: 'START' | 'END';

  constructor() { }

  @HostListener('scroll', ['$event'])
  onElementScroll(event: any) {
    if (event.target.scrollLeft === 0) {
      this.smoothScroll = false;
      this.onStartReached.emit();
      this.lastSideReached = 'START';
      if (!this.numOfItems) {
        setTimeout(() => {

          this.slider.nativeElement.scrollLeft = this.initialScrollWidth;
        }, 4)
      }


    } else if (event.target.scrollLeft + event.target.offsetWidth === this.slider.nativeElement.scrollWidth) {
      this.onEndReached.emit();
      this.smoothScroll = true;

      this.lastSideReached = 'END';

    }

  }

  ngAfterViewInit() {
    const scrollbarWidth = this.slider.nativeElement.offsetWidth;
    const sliderWidth = this.slider.nativeElement.scrollWidth
    this.initialScrollWidth = sliderWidth;
    // scroll half way, but come back half way of the scroll bar to have it in the middle (16 accounted for the 1em grid gap)
    this.slider.nativeElement.scrollLeft = ((sliderWidth / 2) - (scrollbarWidth / 2) - 8 + (this.offset || 0));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.numOfItems && this.lastSideReached === 'START') {
      this.smoothScroll = false;

      setTimeout(() => {

        this.slider.nativeElement.scrollLeft = this.initialScrollWidth;
      }, 4)

    }

  }

  slideRight() {
    this.smoothScroll = true;
    this.onRightClicked.emit();
    setTimeout(() => {

      this.slider.nativeElement.scrollLeft += this.scrollDistance;
    }, 1);

  }

  slideLeft() {
    this.smoothScroll = true;
    this.onLeftClicked.emit();
    setTimeout(() => {

      this.slider.nativeElement.scrollLeft -= this.scrollDistance;
    }, 1);


  }



}
