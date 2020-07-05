import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
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

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    public accountService: AccountService,
    private seoService: SeoService,
    private title: Title,
    private cdr: ChangeDetectorRef,
    private router: Router

  ) { }


  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    e.prompt(); // prompot user to add to homescreen
  }


  ngOnInit() {
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

  async ngAfterViewInit() {
    // this.loadFooter();
    console.log('in hereeee');
    this.loadFontIcons();
    if (!environment.local) {
      this.facebookImplementation();
      this.adobeImplementation();
    }
  

    if (environment.production || environment.uat) {

      // await this.loadjscssfile("../lazyloadedstyles.css", "css");
      if (environment.production) {
        this.newRelicImplementation();
        this.hotjarImplementation();
      }
    }//If production or uat, lazyload main css
    else {
      this.cdr.detectChanges()
      // await this.loadjscssfile("../lazyloadedstyles.js", "js");
      // await this.loadjscssfile("./lazyloadedstyles.css", "css");
    }
    this.insertAdChoice();


  }

  watchRoute() {
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute = event.url;
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

  insertAdChoice() {
    // return;
    //AdChoice
    (function () {
      var ev = document.createElement('script'); ev.type = 'text/javascript'; ev.async = true; ev.setAttribute('data-ev-tag-pid', '20844'); ev.setAttribute('data-ev-tag-ocid', '6368');
      ev.setAttribute("rel", "prefetch");
      ev.src = '//c.evidon.com/pub/tag.js';
      ev.defer = true;
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ev, s);
    })();
    (function (id, cid, cb) {
      var d = document
        , s = d.createElement('script')
        , ts = d.getElementsByTagName('script')[0];
      s.type = 'text/javascript';
      s.async = true;
      s.setAttribute('data-ev-noticeid', id);
      s.setAttribute('data-ev-coid', cid);
      s.setAttribute('data-ev-consent-callback', cb);
      s.setAttribute('data-ev-consent-type', 'c');
      s.src = '//c.evidon.com/pub/gdprnotice.js';
      ts.parentNode.insertBefore(s, ts);
    })('20844', '6368', 'g_consentGiven');

    /* 
        Function used for consent callback.  Put any script or tag manager
        calls in here to execute after consent is detected.  Note, this
        needs to be part of the window namespace so either leave this out of any self executing
        function calls, or assign it to the window namespace (window.g_consentGiven = function() {}
    */
    function g_consentGiven() {
    }

    /*
    // example function which can be used to load a script after consent has been given.
    // Ex:  g_addScript('https://some.tag.com/tracker');
    function g_addScript(url) {
        var head = document.head;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        head.appendChild(script);
    }
    */
    // end AdChoice
  }

  async loadjscssfile(filename: string, filetype: string) {
    // return asynchronously
    if (filetype == "js") { //if filename is a external JavaScript file
      return new Promise(resolve => {
        let fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
        fileref.onload = resolve;
        document.getElementsByTagName("head")[0].appendChild(fileref)
      });

    } else if (filetype == "css") { //if filename is an external CSS file
      return new Promise(resolve => {
        let fileref = document.createElement("link")
        fileref.setAttribute("as", "style")
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || navigator.userAgent.toLowerCase().indexOf('msie') > -1 || navigator.appVersion.indexOf('Trident/') > -1) {//Do not use preload if using Firefox or Internet explorer
          fileref.setAttribute("rel", "stylesheet")
          fileref.onload = resolve

        } else {
          fileref.setAttribute("rel", "preload")
          fileref.onload = () => { fileref.setAttribute('rel', 'stylesheet'); resolve() };

        }
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        document.getElementsByTagName("head")[0].appendChild(fileref)

      })
    }

  }

  facebookImplementation() {
    let facebook = `!function (f, b, e, v, n, t, s) {if (f.fbq) return; n = f.fbq = function () {n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
  }(window, document, 'script',
    'https://connect.facebook.net/en_US/fbevents.js?ngsw-bypass');
  fbq('init', '194312168116213');
  fbq('track', 'PageView');`;

    let facebookNoScript = `<img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=194312168116213&ev=PageView&noscript=1&ngsw-bypass" />`;

    this.loadScript = new Promise((resolve) => {
      let node = document.createElement('script');
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      try {
        node.appendChild(document.createTextNode(facebook));
        document.getElementsByTagName('head')[0].appendChild(node);
      } catch (e) {
        node.text = facebook;
        document.body.appendChild(node);
      }

    });
    this.loadScript = new Promise((resolve) => {
      let nodeNoScript = document.createElement('noscript');
      // nodeNoScript.type = 'text/javascript';
      // nodeNoScript.async = true;
      // nodeNoScript.charset = 'utf-8';
      try {
        nodeNoScript.appendChild(document.createTextNode(facebookNoScript));
        document.getElementsByTagName('head')[0].appendChild(nodeNoScript);
      } catch (e) {
        // nodeNoScript.text = facebookNoScript;
        let text = document.createTextNode(facebookNoScript);
        nodeNoScript.appendChild(text);
        // document.body.appendChild(nodeNoScript);
      }

    });

  }

  adobeImplementation() {
    this.dynamicScriptLoader.load('adobe-tracking', 'adobe-tracking-min').then((data: any) => {
      console.log('Adobe tracking loaded successfully');
    }).catch(console.error)
  }

  newRelicImplementation() {
    this.loadNewRelic = true;
    // this.dynamicScriptLoader.load('new-relic').then((data: any) => {
    //   console.log('New Relic loaded successfully');
    // }).catch(console.error)
  }

  hotjarImplementation() {
    this.dynamicScriptLoader.load('hot-jar').then((data: any) => {
      console.log('Hot Jar loaded successfully');
    }).catch(console.error)
  }

}
