import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-on-board',
  templateUrl: './on-board.component.html',
  styleUrls: ['./on-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OnBoardComponent  {
  @Output() login = new EventEmitter();
  @Output() scroll = new EventEmitter();

  constructor(
    public accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking
  ) {
 
  }

  emitRouteToLogin() {
    this.login.emit();
    this.adobeDtbTracking.anchorLink('Sign In popup on home page');
  }

  scrollToHowItWorks() {
    this.scroll.emit();
    this.adobeDtbTracking.anchorLink('CTA label to scroll to how it works on home page');
  }



}
