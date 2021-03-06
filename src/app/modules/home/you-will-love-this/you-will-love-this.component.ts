import { ChangeDetectionStrategy, Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CarouselData } from '../../../utilities/carousel-data';

@Component({
  selector: 'app-you-will-love-this',
  templateUrl: './you-will-love-this.component.html',
  styleUrls: ['./you-will-love-this.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YouWillLoveThisComponent implements OnInit {
  carouselData = CarouselData;

  @Output() navigate = new EventEmitter();
  @Output() onGetStarted = new EventEmitter();


  constructor(@Inject(LOCALE_ID) public locale: string
  ) { }

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

  trackByIndex(i: number) {
    return i;
  }

}
