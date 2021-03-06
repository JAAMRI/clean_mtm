import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, LOCALE_ID, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MTMPage, MTMPages } from './components/desktop-toolbar/desktop-pages';
import { AccountService } from './services/account/account.service';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader/dynamic-script-loader.service';
import { SeoService } from './services/seo.service';

declare var digitalData: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  unsubscribeAll = new Subject();
  activeRoute: string;
  loadScript: Promise<any>;
  loadNewRelic = false;
  loadLoyaltyAmazonPixel = false;
  loadAwarenessAmazonPixel = false;
  loadPinterest = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    @Inject(LOCALE_ID) private locale: string,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private accountService: AccountService,
    private seoService: SeoService,
    private title: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,

  ) { }


  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    if (e) {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      e.prompt(); // prompot user to add to homescreen
    }
  }


  ngOnInit() {
    if (environment.dev) {
      this.loadRobotsInHeader()
    }
    this.isLoggedIn();
    this.activeRoute = this.router.url;
    this.watchRoute();

    if (!isPlatformBrowser(this.platformId)) {
      let bases = document.getElementsByTagName('base');

      if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
      }
    }
  }


  checkDevUrl() {
    if (this.route.snapshot.queryParamMap.get('s') !== environment.devUrlKey) {
      window.location.href = 'https://www.mealsthatmatter.com'
    }
  }

  ngAfterViewInit() {
    if (environment.uat || environment.production) {
      setTimeout(() => {
        this.adobeAnalyticsImplementation();
        this.adobeImplementation();
        this.pinterestImplementation();
        this.facebookImplementation();
        this.newRelicImplementation();
        // this.hotjarImplementation();
        this.pixelImplementation();
        this.amazonPixelImplementation();
        this.dynamicScriptLoader.insertAdChoice();
      }, 7000);
    }

    this.cdr.detectChanges()
  }

  watchRoute() {
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute = event.url;
      if (environment.dev) {
        this.checkDevUrl()
        // http://localhost:4200/?s=UniMTM@devTWH
      }
    });
  }

  isLoggedIn() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      this.accountService.loggedIn = true;
    }
    )
      .catch(err => console.log(err));
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
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

  setSeo() {
    const activePage = this.getActivePage();
    this.seoService.generateTags({
      title: activePage.title,
      description: activePage.description,
      image: activePage.image,
      slug: activePage.route
    })
  }

  setTitle() {
    const activePage = this.getActivePage();
    this.title.setTitle(activePage.title);
  }

  

  facebookImplementation() {
    this.dynamicScriptLoader.load('facebook-pixel').then((data: any) => {
      console.log('Facebook pixel tracking loaded successfully');
    }).catch(console.error)
  }

  adobeAnalyticsImplementation() {
    this.dynamicScriptLoader.load('adobe-analytics').then((data: any) => {
      console.log('Adobe Analytics loaded successfully');
    }).catch(console.error)
  }

  adobeImplementation() {
    this.dynamicScriptLoader.load('adobe-tracking', 'adobe-tracking-min').then((data: any) => {
      console.log('Adobe tracking loaded successfully');
      // implements body hiding after adobe is loaded sinc eit depends on it
      this.bodyhidingImplementation();
      if (this.locale === 'fr') {
        // set digital pageinfo language after adobe tracking has been set
        digitalData.page.pageInfo.language = "FR";
      } else {
        digitalData.page.pageInfo.language = "EN";
      }

    }).catch(console.error)
  }

  bodyhidingImplementation() {
    // this.loadNewRelic = true;
    this.dynamicScriptLoader.load('bodyhiding').then((data: any) => {
      console.log('bodyhiding loaded successfully');
    }).catch(console.error)
  }

  loadRobotsInHeader() {
    // this.loadNewRelic = true;
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex";
    document.getElementsByTagName('head')[0].appendChild(meta);

  }

  newRelicImplementation() {
    // this.loadNewRelic = true;
    this.dynamicScriptLoader.load('new-relic').then((data: any) => {
      console.log('New Relic loaded successfully');
    }).catch(console.error)
  }

  hotjarImplementation() {
    // this.dynamicScriptLoader.load('hot-jar').then((data: any) => {
    //   console.log('Hot Jar loaded successfully');
    // }).catch(console.error)
  }

  pixelImplementation() {
    this.dynamicScriptLoader.load('pixel-min', 'pixel').then((data: any) => {
      console.log('Pixel loaded successfully');
    }).catch(console.error)
  }

  amazonPixelImplementation() {
    this.dynamicScriptLoader.load('loyalty-amazon', 'awareness-amazon').then((data: any) => {
      console.log('Amazon loyalty and awareness loaded successfully');
      this.loadAwarenessAmazonPixel = true;
      this.loadLoyaltyAmazonPixel = true;
    }).catch(console.error)
  }

  pinterestImplementation() {
    this.dynamicScriptLoader.load('pinterest').then((data: any) => {
      console.log('Pinterest loaded');
      this.loadPinterest = true;
    }).catch(console.error)
  }



}
