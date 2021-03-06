import { ChangeDetectionStrategy, Component, HostListener, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MTMPage, MTMPageNames, MTMPages } from 'src/app/components/desktop-toolbar/desktop-pages';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.component';
import { AccountService } from '../../services/account/account.service';
import { AdobeDtbTracking } from '../../services/adobe_dtb_tracking.service';
import { BREADCRUMBS } from '../../utilities/breadcrumbs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {

  unsubscribeAll = new Subject();
  activeRoute: string = '';
  loggedIn: boolean;
  onAuthPage: boolean;
  isMobile: boolean = (window.innerWidth < 768);
  breadcrumbs: Breadcrumb[] = BREADCRUMBS;
  showBreadcrumbs: boolean;

  constructor(
    private router: Router,
    public accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = (event.target.innerWidth < 768);

  }
  ngOnInit() {
    this.setActiveRoute();
    this.setLoggedInStatus();

    this.activateBreadcrumb();
    this.onAuthPage = this.activeRoute.includes('auth');
    this.watchRoute();
  }

  setLoggedInStatus() {
    this.loggedIn = this.accountService.loggedIn;
  }

  setActiveRoute() {
    this.activeRoute = this.router.url;
  }

  navigate(pageName: string) {
    this.router.navigate([MTMPages[pageName].route], { queryParamsHandling: "preserve" });
    if (MTMPages[pageName]) {
      this.adobeDtbTracking.pageTracking(MTMPages[pageName].name, MTMPages[pageName].route);
    }
  }

  watchRoute() {
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute = event.url;
      this.onAuthPage = this.activeRoute.includes('auth');
      this.activateBreadcrumb();
    });
  }

  get showNavButtons() {
    return  this.activeRouteOnDiscoverPage || this.activeRouteOnGroceryList || this.activeRouteOnMyMeals;
  }



  next() {
    const activePageName = this.getActivePage().name;
    if (activePageName === MTMPageNames.SELECT_MEALS) {
      this.router.navigate(['/recipes/my-meals'], { queryParamsHandling: "preserve" });
      this.adobeDtbTracking.pageTracking('NEXT', '/recipes/my-meals');
    } else if (activePageName === MTMPageNames.MEAL_PLAN) {
      this.router.navigate(['/recipes/grocery-list'], { queryParamsHandling: "preserve" });
      this.adobeDtbTracking.pageTracking('NEXT', '/recipes/grocery-list');

    } 
  }

  back() {
    const activePageName = this.getActivePage().name;
    if (activePageName === MTMPageNames.MEAL_PLAN) {
      this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" });
      this.adobeDtbTracking.pageTracking('BACK', '/recipes/discover');

    } else if (activePageName === MTMPageNames.GROCERY_LIST) {
      this.router.navigate(['/recipes/my-meals'], { queryParamsHandling: "preserve" });
      this.adobeDtbTracking.pageTracking('BACK', '/recipes/my-meals');

    }
  }

  get activeRouteOnDiscoverPage() {
    // using this as a getter in the html to check if the route is in discover page and has q param
    return this.activeRoute.includes('/recipes/discover');
  }

  get activeRouteOnMyMeals() {
    // using this as a getter in the html to check if the route is in discover page and has q param
    return this.activeRoute.includes('/recipes/my-meals');
  }

  get activeRouteOnGroceryList() {
    // using this as a getter in the html to check if the route is in discover page and has q param
    return this.activeRoute.includes('/recipes/grocery-list');
  }

  activateBreadcrumb() {
    // activate the active breadcrums, and allow the toolbar to know when to show them
    let activePageName = this.getActivePage().name;
    this.breadcrumbs.forEach((breadcrumb: Breadcrumb) => {
      if (activePageName === MTMPageNames.SELECT_MEALS) {
        this.showBreadcrumbs = true;

        if (breadcrumb.name.toLowerCase() === MTMPageNames.SELECT_MEALS.toLowerCase()) {
          breadcrumb.active = true
        } else {
          breadcrumb.active = false;
        }

      } else if (activePageName === MTMPageNames.MEAL_PLAN) {
        this.showBreadcrumbs = true;

        if (breadcrumb.name.toLowerCase() === MTMPageNames.SELECT_MEALS.toLowerCase() ||
          breadcrumb.name.toLowerCase() === MTMPageNames.MEAL_PLAN.toLowerCase()
        ) {
          breadcrumb.active = true
        } else {
          breadcrumb.active = false;
        }
      } else if (activePageName === MTMPageNames.GROCERY_LIST) {
        breadcrumb.active = true;
        this.showBreadcrumbs = true;
      } else {
        breadcrumb.active = false;

        this.showBreadcrumbs = activePageName.includes(MTMPageNames.AUTH)

      }
    });
  }

  getActivePage(): MTMPage {
    let activePage: MTMPage;
    Object.values(MTMPages).forEach((page) => {
      if (this.activeRoute.includes(page.route)) {
        activePage = page;
      }
    });
    return activePage;
  }


  signOut() {
    this.adobeDtbTracking.signout();
    Auth.signOut()
      .then(data => {
        this.accountService.loggedIn = false;
        this.router.navigate(['/'], { queryParamsHandling: "preserve" });

      })
      .catch(err => {
        alert(err.message);
      });

  }

  signIn() {
    this.router.navigate(['/auth/login']);
  }

  routeHome() {
    this.router.navigate(['/'], { queryParamsHandling: "preserve" });
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
