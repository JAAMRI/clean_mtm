import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../dialogs/user-form/user-form.component';
import { AccountService } from '../../../app/services/account/account.service';
import Auth from '@aws-amplify/auth';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BREAKPOINTS } from '../../utilities/breakpoints';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  unsubscribeAll = new Subject();
  activePage: string;
  isMobile: boolean;
  @ViewChild('snav', { static: false }) snav: any;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    public accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking,
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

  ngOnInit() {
    this.watchRoute();
  }

  watchRoute() {
    this.activePage = this.router.url;
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activePage = event.url;
    });
  }

  signOut() {
    this.adobeDtbTracking.signout();
    Auth.signOut()
      .then(data => {
        this.accountService.loggedIn = false;
        this.router.navigate(['/']);

      })
      .catch(err => {
        alert(err.message);
      });

  }

  authControl() {
    this.accountService.loggedIn ? this.router.navigate(['/']) : this.promptUserForAuth();
    this.adobeDtbTracking.anchor_link('Sign In popup on navigation');
  }

  promptUserForAuth() {
    this.dialog.open(UserFormComponent, {
      panelClass: 'email-dialog-container',
      backdropClass: 'faded-backdrop',
      data: { isMobile: false }
    });
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
