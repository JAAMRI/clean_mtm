import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { env } from 'process';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MTMPage, MTMPages } from './components/desktop-toolbar/desktop-toolbar.component';
import { AccountService } from './services/account/account.service';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader/dynamic-script-loader.service';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unsubscribeAll = new Subject();
  activeRoute: string;
  loadScript: Promise<any>;
  stylesToBeLoaded: boolean = false;
  loadNewRelic = false;
  loadLoyaltyAmazonPixel = false;
  loadAwarenessAmazonPixel = false;
  loadPinterest = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    public accountService: AccountService,
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

  async ngAfterViewInit() {
    // this.loadFooter();
    
    this.loadFontIcons();
    // this.pixelImplementation();
    if (environment.uat || environment.production) {
      this.pinterestImplementation();
      this.bodyhidingImplementation()
      this.adobeImplementation();
      this.facebookImplementation();
      this.newRelicImplementation();
      // this.hotjarImplementation();
      this.pixelImplementation();
      this.amazonPixelImplementation();


    }//If production or uat, lazyload main css
    this.cdr.detectChanges()
    this.dynamicScriptLoader.insertAdChoice();
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

  loadFontIcons() {
    this.stylesToBeLoaded = true;
    this.cdr.detectChanges();
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

  adobeImplementation() {
    this.dynamicScriptLoader.load('adobe-tracking', 'adobe-tracking-min').then((data: any) => {
      console.log('Adobe tracking loaded successfully');
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
