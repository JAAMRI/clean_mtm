import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuPage } from '../../../app/interfaces/menu-page';
import { takeUntil, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserFormComponent } from '../dialogs/user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../../app/services/account/account.service';
import Auth from '@aws-amplify/auth';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Output() close = new EventEmitter();
  currentRoute: string;
  menuPages: MenuPage[] = [
    { name: 'SELECT MEALS', route: '/recipes/discover', },
    { name: `FAVOURITES`, route: '/recipes/favourites', }, // TODO when favourites page is created
    { name: `MEAL PLAN`, route: '/recipes/my-meals' },
    { name: 'GROCERY LIST', route: '/recipes/grocery-list' },
    { name: 'ABOUT', route: '/about' },
  ];
  unsubscribeAll = new Subject();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking
  ) { }

  ngOnInit() {
    this.watchRoute();
  }

  closeMobileMenu(name, url) {
    this.close.emit();
    if (name.length > 0 && url.length > 0) {
      this.adobeDtbTracking.page_tracking(name, url);
    }
  }

  signOut() {
    this.adobeDtbTracking.signout();
    Auth.signOut()
      .then(data => {
        this.close.emit();
        this.accountService.loggedIn = false;
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err.message);
      });

  }



  authControl() {
    this.promptUserForAuth()
  }

  promptUserForAuth() {
    this.dialog.open(UserFormComponent, {
      panelClass: 'email-dialog-container',
      backdropClass: 'faded-backdrop',
      data: { isMobile: true }
    });
  }

  watchRoute() {
    this.setActiveRoute(this.router.url);
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setActiveRoute(event.url);
    });
  }

  setActiveRoute(url: string) {
    this.currentRoute = url;
    this.menuPages.forEach((page) => {
      if (url.includes(page.route)) {
        page.active = true;
      } else {
        page.active = false;
      }
    });
  }

}
