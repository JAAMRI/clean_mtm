import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as smoothscroll from "smoothscroll-polyfill";
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';
import { scrollToTop } from '../../../app/utilities/helper-functions';
import { AccountService } from '../../services/account/account.service';

// use this to scroll on safari
smoothscroll.polyfill();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  unsubscribeAll = new Subject();
  onLandingPage: boolean;
  @ViewChild('howItWorks') howItWorks: ElementRef;
  isLoggedIn: boolean;



  constructor(private router: Router,
    private accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking,
  ) {
  }

  ngOnInit() {
    scrollToTop();
    this.isLoggedIn = this.accountService.loggedIn;
    this.onLandingPage = (this.router.url === '/'); // check if we are on landing page which is /
  }//end ngOnInit



  ngAfterViewInit() {
    this.watchRoute(); // skip 1 cycle to let route come into place
    setTimeout(() => { this.adobeDtbTracking.pageLoad("home page"); }, 1000);
  }

  routeToLogin() {
    this.router.url === '/login' ? this.promptUserForAuth() : this.router.navigate(['/login']);
    // if user is already on login and clicked button, show auth, else route to login and router will show auth
  }

  signOut() {
    Auth.signOut().then(_ => {
      this.accountService.loggedIn = false;
      this.isLoggedIn = false;
      this.router.navigate(['/']);

    })
  }

  promptUserForAuth() {
    this.router.navigate(['/auth'])
  }

  watchRoute() {
    if (this.router.url === '/login') {
      this.promptUserForAuth();
      // if routed to url 'login', then show auth dialog
    }
    this.checkIfRouteToHowItWorks()
    
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.onLandingPage = (event.url === '/');
      if (event.url === '/login') {
        this.promptUserForAuth();
      }
      this.checkIfRouteToHowItWorks();
     
    });
  }

  checkIfRouteToHowItWorks() {
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment === 'howitworks') {
      setTimeout(() => this.scrollToHowItWorks(), 1)
    }
  }

  checkAuth(recipeLink?: string) {
    if (this.accountService.loggedIn) {
      this.routeToRecipes(recipeLink);
    } else {
      this.promptUserForAuth()
    }

  }

  getStarted() {
    const route = this.accountService.loggedIn ? '/recipes/discover' : '/auth';
    this.router.navigate([route])
  }

  routeToRecipes(recipeLink?: string) {
    const route = recipeLink || '/recipes/discover';
    this.router.navigate([route]);
  }

  scrollToHowItWorks() {
   
    this.howItWorks.nativeElement.scrollIntoView({ behavior: 'smooth' });
    // scroll down to how it works when clicking on button
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
