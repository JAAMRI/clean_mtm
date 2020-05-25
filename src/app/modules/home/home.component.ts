import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as smoothscroll from "smoothscroll-polyfill";
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';
import { SeoService } from '../../../app/services/seo.service';
import { BREAKPOINTS } from '../../../app/utilities/breakpoints';
import { scrollToTop } from '../../../app/utilities/helper-functions';
import { UserFormComponent } from '../../components/dialogs/user-form/user-form.component';

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
  isMobile: boolean;
  isWeb: boolean;
  @ViewChild('howItWorks', { static: true }) howItWorks: ElementRef;
  @ViewChild('howItWorksContainer', { read: ViewContainerRef }) howItWorksContainer: ViewContainerRef;
  @ViewChild('youWillLoveThisContainer', { read: ViewContainerRef }) youWillLoveThisContainer: ViewContainerRef;
  @ViewChild('reclaimWeeknightCookingContainer', { read: ViewContainerRef }) reclaimWeeknightCookingContainer: ViewContainerRef;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private seo: SeoService, private title: Title,
    public adobeDtbTracking: AdobeDtbTracking,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.observeBreakpoints();
    this.scrollIntoView();
  }

  ngOnInit() {
    scrollToTop();
    this.onLandingPage = (this.router.url === '/'); // check if we are on landing page which is /
    this.title.setTitle('Meal Prep  & Weekly Meal Planner | Meals That Matter'); //updating page title
    this.seo.generateTags({ //updating seo
      title: 'Meal Prep  & Weekly Meal Planner | Meals That Matter',
      description: 'Welcome to the all-in-one meal preparation tool, where you can choose from a wide range of seasonal and flavorful recipes to take your meal prep for the week to a whole new level!',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: ''
    });
  }//end ngOnInit


  ngAfterViewInit() {
    setTimeout(() => this.watchRoute()); // skip 1 cycle to let route come into place
    setTimeout(() => { this.adobeDtbTracking.page_load("home page"); }, 1000);
  }


  scrollIntoView() {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment === 'howitworks') {
          setTimeout(() => this.scrollToHowItWorks(false), 1)
        }
      }
    });
  }

  routeToLogin() {
    this.router.url === '/login' ? this.promptUserForAuth() : this.router.navigate(['/login']);
    // if user is already on login and clicked button, show auth, else route to login and router will show auth
  }

  promptUserForAuth() {
    const authDialog = this.dialog.open(UserFormComponent, {
      panelClass: 'email-dialog-container',
      backdropClass: 'faded-backdrop',
      data: { isMobile: this.isMobile }
    });

    authDialog.afterClosed().pipe(takeUntil(this.unsubscribeAll)).subscribe(() => this.router.navigate(['/']))
    // if the dialog is closed, go back to the home page as opposed to the dialog

  }

  observeBreakpoints() {
    this.breakpointObserver.observe(BREAKPOINTS).pipe(takeUntil
      (this.unsubscribeAll)).subscribe((result: BreakpointState) => {
        const isMobilePortrait = this.breakpointObserver.isMatched('(max-width: 599px)');
        const isMobileLandscape = this.breakpointObserver.isMatched('(max-width: 959px)');
        this.isMobile = isMobilePortrait || isMobileLandscape;
        this.isWeb = this.breakpointObserver.isMatched('(min-width: 960px)');
      });
  }

  watchRoute() {
    if (this.router.url === '/login') {
      this.promptUserForAuth();
      // if routed to url 'login', then show auth dialog
    }
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.onLandingPage = (event.url === '/');
      if (event.url === '/login') {
        this.promptUserForAuth();
      }
    });
  }

  scrollToHowItWorks(smooth: boolean = true) {
    if (smooth) {
      this.howItWorks.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.howItWorks.nativeElement.scrollIntoView();
    }
    // scroll down to how it works when clicking on button
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
