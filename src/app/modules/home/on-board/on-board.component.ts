import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../services/account/account.service';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';
import { BREAKPOINTS } from '../../../utilities/breakpoints';

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
    this.adobeDtbTracking.anchorLink('Sign In popup on home page');
  }

  scrollToHowItWorks() {
    this.scroll.emit();
    this.adobeDtbTracking.anchorLink('CTA label to scroll to how it works on home page');
  }

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
  }

}
