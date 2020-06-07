import { Component, OnInit, Input } from '@angular/core';

import { CarouselData } from '../home-carousel-helper';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-you-will-love-this',
  templateUrl: './you-will-love-this.component.html',
  styleUrls: ['./you-will-love-this.component.scss']
})
export class YouWillLoveThisComponent implements OnInit {
  carouselData = CarouselData;


  constructor(
    public adobeDtbTracking: AdobeDtbTracking
  ) {}

  ngOnInit(): void {
  }

  pushEnd() {
    this.carouselData = [...this.carouselData, ...CarouselData]
  }
  pushStart() {
    this.carouselData = [...CarouselData, ...this.carouselData]

  }

  trackByIndex(i: number) {
    return i;
  }

}
