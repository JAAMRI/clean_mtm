import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ViewContainerRef, TemplateRef, ComponentFactoryResolver, Type, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
// import smoothscroll from 'smoothscroll-polyfill';
import { BREAKPOINTS } from '../../../app/utilities/breakpoints';
import { scrollToTop } from '../../../app/utilities/helper-functions';
import { UserFormComponent } from '../../components/dialogs/user-form/user-form.component';
import { CarouselData } from './home-carousel-helper';
import { SeoService } from '../../../app/services/seo.service';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

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
  isMobile: boolean;
  isWeb: boolean;
  carouselData = CarouselData;
  @ViewChild('howitworks', { static: true }) howItWorks: ElementRef;

  howItWorksComponent: Type<HowItWorksComponent>;

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "infinite": true
  }; // slide config for carousel

  steps = [
    {
      icon: 'assets/static_images/noun_recipes_1132517.svg',
      name: 'BROWSE OUR RECIPES',
    },
    {
      icon: 'assets/static_images/noun_Browser_83393.svg',
      name: 'CREATE MEAL PLAN',
    },
    {
      icon: 'assets/static_images/noun_Shopping Cart_2776002.svg',
      name: 'SHOP YOUR MEAL PLAN'
    }
  ]; // icons

  @ViewChild(TemplateRef, { read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private matIconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer, 
    private seo: SeoService, private title: Title, 
    public adobeDtbTracking: AdobeDtbTracking,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.observeBreakpoints();
    this.createStepIcons();
    this.scrollIntoView();

  }

  ngOnInit() {
    scrollToTop();
    this.onLandingPage = (this.router.url === '/'); // check if we are on landing page which is /
    setTimeout(() => this.watchRoute()); // skip 1 cycle to let route come into place
    this.title.setTitle('Meal Prep  & Weekly Meal Planner | Meals That Matter'); //updating page title
    this.seo.generateTags({ //updating seo
      title: 'Meal Prep  & Weekly Meal Planner | Meals That Matter',
      description: 'Welcome to the all-in-one meal preparation tool, where you can choose from a wide range of seasonal and flavorful recipes to take your meal prep for the week to a whole new level!',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: ''
    });

    setTimeout(() => {
      this.adobeDtbTracking.page_load("home page");
    },
      1000);
  }//end ngOnInit

  ngAfterViewInit(){
    this.lazyLoadComponents();
  }

  lazyLoadComponents(){
    // this.howItWorksComponent = (await import("./how-it-works/how-it-works.component")).HowItWorksComponent;
    import("./how-it-works/how-it-works.component").then( 
      ({HowItWorksComponent}) => {
        const component = this.componentFactoryResolver.resolveComponentFactory(
          HowItWorksComponent
        );
        const componentRef = this.viewContainerRef.createComponent(
          component
        );
        this.howItWorksComponent = HowItWorksComponent;
        componentRef.instance.isMobile = this.isMobile;
      }
    );
    // const componentRef = this.howItWorksTemplateViewContainerRef.createComponent(
    //   this.howItWorksComponent
    // );
    // this.howItWorksComponent['isMobile'] = true;
    // this.howItWorksTemplateViewContainerRef.createComponent(this.howItWorksComponent).instance
  }

  private lazyLoadHowItWorks(isMobile: any): void {
    import('./how-it-works/how-it-works.component').then(
      ({ HowItWorksComponent }) => {
        const component = this.componentFactoryResolver.resolveComponentFactory(
          HowItWorksComponent
        );
        // const componentRef = this.howItWorksTemplateViewContainerRef.createComponent(
        //   component
        // );
        // componentRef.instance.isMobile = isMobile;
      }
    );
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
        this.slideConfig = { ...this.slideConfig, 'slidesToShow': this.isWeb ? 3 : (this.isMobile ? 1 : 2) };
      });
  }

  createStepIcons() {
    this.steps.forEach((step) => {
      this.matIconRegistry.addSvgIcon(step.name, this.sanitizer.bypassSecurityTrustResourceUrl(step.icon));
    });
    this.matIconRegistry.addSvgIcon('right-arrow', this.sanitizer.bypassSecurityTrustResourceUrl('assets/static_images/right-arrow.svg'));
    // creating step icons for carousel

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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.adobeDtbTracking.anchor_link('CTA LABEL Home Page');
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
