import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MTMPages, MTMPageNames } from '../../components/desktop-toolbar/desktop-toolbar.component';
import { UserFormComponent } from '../../components/dialogs/user-form/user-form.component';
import { AccountService } from '../../services/account/account.service';
import { AdobeDtbTracking } from '../../services/adobe_dtb_tracking.service';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.component';
import { BREADCRUMBS } from '../../utilities/breadcrumbs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {

  unsubscribeAll = new Subject();
  activePage: string = '';
  loggedIn = this.accountService.loggedIn;
  onAuthPage: boolean;
  isMobile: boolean = (window.innerWidth < 768);
  breadcrumbs: Breadcrumb[] = BREADCRUMBS;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking,
  ) { }

  ngOnInit() {
    this.setActivePage();
    this.onAuthPage = this.activePage.includes('auth');
    this.watchRoute();
  }

  setActivePage() {
    this.activePage = this.router.url;
    this.activateBreadcrumb();
  }

  navigate(pageName: string) {
    console.log(pageName)
    this.router.navigate([MTMPages[pageName].route]);
    if (MTMPages[pageName]) {
      this.adobeDtbTracking.pageTracking(MTMPages[pageName].name, MTMPages[pageName].route);
    }
  }

  watchRoute() {
    
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activePage = event.url;
      this.activateBreadcrumb();
    });
  }

  next() {
    const activePageName = this.getActivePageNameFromRoute();
    if (activePageName === MTMPageNames.SELECT_MEALS) {
      this.router.navigate(['/recipes/my-meals']);
    } else if (activePageName === MTMPageNames.MEAL_PLAN) {
      this.router.navigate(['/recipes/grocery-list']);
    } else {
      // start shopping
    }
  }

  back() {
    const activePageName = this.getActivePageNameFromRoute();
    if (activePageName === MTMPageNames.MEAL_PLAN) {
      this.router.navigate(['/recipes/discover']);
    } else if (activePageName === MTMPageNames.GROCERY_LIST) {
      this.router.navigate(['/recipes/my-meals']);
    } 
  }

  activateBreadcrumb() {
    let activePageName = this.getActivePageNameFromRoute();
    this.breadcrumbs.forEach((breadcrumb: Breadcrumb) => {
      if (activePageName === MTMPageNames.SELECT_MEALS) {
        if (breadcrumb.name.toLowerCase() === MTMPageNames.SELECT_MEALS.toLowerCase()) {
          breadcrumb.active = true
        } else {
          breadcrumb.active = false;
        }

      } else if (activePageName === MTMPageNames.MEAL_PLAN) {
        if (breadcrumb.name.toLowerCase() === MTMPageNames.SELECT_MEALS.toLowerCase() ||
          breadcrumb.name.toLowerCase() === MTMPageNames.MEAL_PLAN.toLowerCase()
        ) {
          breadcrumb.active = true
        } else {
          breadcrumb.active = false;
        }
      } else if (activePageName === MTMPageNames.GROCERY_LIST) {
        breadcrumb.active = true;
      }
    });
  }

  getActivePageNameFromRoute() {
    let activePageName;
    Object.values(MTMPages).forEach((page) => {
      if (page.route === this.activePage) {
        activePageName = page.name;
      }
    });
    return activePageName;
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
    this.adobeDtbTracking.anchorLink('Sign In popup on navigation');
  }

  promptUserForAuth() {
    this.dialog.open(UserFormComponent, {
      panelClass: 'email-dialog-container',
      backdropClass: 'faded-backdrop',
      data: { isMobile: false }
    });
  }

  routeHome() {
    this.router.navigate(['/']);
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
