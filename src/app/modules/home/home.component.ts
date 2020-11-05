import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';
import { scrollToTop } from '../../../app/utilities/helper-functions';
import { AccountService } from '../../services/account/account.service';
import { SeoService } from '../../services/seo.service';

// use this to scroll on safari
// smoothscroll.polyfill();

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
  isMobile = null;

  constructor(private router: Router,
    private accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking,
    private seoService: SeoService
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 1024;
  }

  ngOnInit() {
    scrollToTop();
    this.isLoggedIn = this.accountService.loggedIn;
    this.onLandingPage = (this.router.url === '/'); // check if we are on landing page which is /
    this.updateSeoTags()
  }//end ngOnInit

  updateSeoTags() {
    this.seoService.generateTags({
      title: 'Meals That Matter | Plan. Prep. Plate.',
      description: 'Welcome to the all-in-one meal preparation tool, where you can choose from a wide range of seasonal and flavorful recipes to take your meal prep for the week to a whole new level!',
      slug: this.router.url
    })
  }



  ngAfterViewInit() {
    this.watchRoute(); // skip 1 cycle to let route come into place
    setTimeout(() => { this.adobeDtbTracking.pageLoad("home page"); }, 1000);
  }

  routeToLogin() {
    this.router.url === '/login' ? this.promptUserForAuth() : this.router.navigate(['/login'], { queryParamsHandling: "preserve" });
    this.adobeDtbTracking.anchorLink('Login ');

    // if user is already on login and clicked button, show auth, else route to login and router will show auth
  }

  signOut() {
    Auth.signOut().then(_ => {
      this.accountService.loggedIn = false;
      this.isLoggedIn = false;
      this.router.navigate(['/'], { queryParamsHandling: "preserve" });

    })
  }

  promptUserForAuth() {
    this.router.navigate(['/auth'], { queryParamsHandling: "preserve" })
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

  checkAuth(link?: string, comingFrom?: string) {
    if (this.accountService.loggedIn) {
      this.routeToRecipes(link, comingFrom);

    } else {
      this.promptUserForAuth()
    }

  }

  getStarted() {
    const route = this.accountService.loggedIn ? '/recipes/discover' : '/auth';
    this.adobeDtbTracking.pageTracking('GET STARTED', '/recipes/discover');

    this.router.navigate([route], { queryParamsHandling: "preserve" })
  }

  routeToRecipes(link?: string, comingFrom?: string) {
    const route = link || '/recipes/discover';
    this.router.navigate([route], { queryParamsHandling: "preserve" });
    this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);

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
