import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../dialogs/user-form/user-form.component';
import { AccountService } from '../../../app/services/account/account.service';
import { Auth } from 'aws-amplify';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  unsubscribeAll = new Subject();
  activePage: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking
  ) {
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
