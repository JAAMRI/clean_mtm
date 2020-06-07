import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MenuPage } from '../../../app/interfaces/menu-page';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';
import { AuthenticatedPages, MenuPages } from './mobile-menu-pages';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MobileMenuComponent implements OnInit {
  @Output() close = new EventEmitter();
  currentRoute: string;
  authenticatedPages: MenuPage[] = AuthenticatedPages;
  menuPages: MenuPage[] = MenuPages;
  unsubscribeAll = new Subject();
  @Input() loggedIn: boolean;
  @Output() onSignOut = new EventEmitter();

  constructor(
    private router: Router,
    public adobeDtbTracking: AdobeDtbTracking
  ) { }

  ngOnInit() {
    this.watchRoute();
  }

  closeMobileMenu(name: string, url: string) {
    this.close.emit();
    if (name.length > 0 && url.length > 0) {
      this.adobeDtbTracking.pageTracking(name, url);
    }
  }

  signOut() {
    this.adobeDtbTracking.signout();
    this.close.emit();
    this.onSignOut.emit();
  }


  promptUserForAuth() {
    this.router.navigate(['/auth']);
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
