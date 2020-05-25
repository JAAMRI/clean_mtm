import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mtm-slider',
  templateUrl: './mtm-slider.component.html',
  styleUrls: ['./mtm-slider.component.scss']
})
export class MtmSliderComponent implements AfterViewInit {
  @ViewChild('slider', { static: true }) slider: ElementRef;


  constructor() { }

  ngAfterViewInit(): void {
    // this.scrollToMiddle()
  }

  // scrollToMiddle() {
  //   setTimeout(() => {
  //     this.slider.nativeElement.scrollLeft = (this.slider.nativeElement.clientWidth /2);

  //   }, 1000);

  // }


}
