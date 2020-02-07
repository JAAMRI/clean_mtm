import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BREAKPOINTS } from '../../../app/utilities/breakpoints';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnDestroy {
  isMobile: boolean;
  unsubscribeAll = new Subject();
  @ViewChild('snav', { static: false }) snav: any;

  constructor(
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe(BREAKPOINTS).pipe(takeUntil
      (this.unsubscribeAll)).subscribe((result: BreakpointState) => {
        const isMobilePortrait = breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: portrait)');
        const isMobileLandscape = breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)');
        this.isMobile = isMobilePortrait || isMobileLandscape;
        // mobile breakpoints
      });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
