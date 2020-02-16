import { Component, OnInit, Input } from '@angular/core';

import { CarouselData } from '../home-carousel-helper';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-you-will-love-this',
  templateUrl: './you-will-love-this.component.html',
  styleUrls: ['./you-will-love-this.component.scss']
})
export class YouWillLoveThisComponent implements OnInit {

  @Input() isMobile: any;
  isWeb = false;//This needs to come dynamically from parent component

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "infinite": true
  }; // slide config for carousel
  carouselData = CarouselData;


  constructor(
    public adobeDtbTracking: AdobeDtbTracking
  ) {}

  ngOnInit(): void {
    // this.slideConfig = { ...this.slideConfig, 'slidesToShow': this.isWeb ? 3 : (this.isMobile ? 1 : 2) };
    this.slideConfig = { ...this.slideConfig, 'slidesToShow': this.isMobile ? 1 : 3 };

  }

}
