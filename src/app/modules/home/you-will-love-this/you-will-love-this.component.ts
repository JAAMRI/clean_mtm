import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { CarouselData } from '../home-carousel-helper';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-you-will-love-this',
  templateUrl: './you-will-love-this.component.html',
  styleUrls: ['./you-will-love-this.component.scss']
})
export class YouWillLoveThisComponent implements OnInit {
  carouselData = CarouselData;
  @Output() navigate = new EventEmitter();


  constructor(
    public adobeDtbTracking: AdobeDtbTracking,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  emitNavigation() {
    this.navigate.emit();
  }

  pushEnd() {
    this.carouselData = [...this.carouselData, ...CarouselData]
  }
  pushStart() {
    this.carouselData = [...CarouselData, ...this.carouselData]

  }

  getStarted() {
    const route = '/auth';
    this.adobeDtbTracking.pageTracking('GET STARTED', '/');
    this.router.navigate([route]);
  }

  trackByIndex(i: number) {
    return i;
  }

}
