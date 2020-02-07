import { Component, ViewEncapsulation, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { BREAKPOINTS } from '../../../app/utilities/breakpoints';
import { AccountService } from '../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-on-board',
  templateUrl: './on-board.component.html',
  styleUrls: ['./on-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OnBoardComponent implements OnDestroy {
  isWeb: boolean;
  breakpointSubscription: Subscription;
  @Output() login = new EventEmitter();
  @Output() scroll = new EventEmitter();

  constructor(
    breakpointObserver: BreakpointObserver,
    public accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking
  ) {
    this.breakpointSubscription = breakpointObserver.observe(BREAKPOINTS).subscribe((result: BreakpointState) => {
      this.isWeb = breakpointObserver.isMatched('(min-width: 960px)');
    });
  }

  emitRouteToLogin() {
    this.login.emit();
    this.adobeDtbTracking.anchor_link('Sign In popup on home page');
  }

  scrollToHowItWorks() {
    this.scroll.emit();
    this.adobeDtbTracking.anchor_link('CTA label to scroll to how it works on home page');
  }

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
  }

}
