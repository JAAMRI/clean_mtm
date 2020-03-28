import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
// import { AmplifyService } from 'aws-amplify-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from './services/account/account.service';
import { BREAKPOINTS } from './utilities/breakpoints';
import { Auth } from 'aws-amplify';
import { environment } from '../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { AdobeDtbTracking } from './services/adobe_dtb_tracking.service';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unsubscribeAll = new Subject();
  isPortrait: boolean;
  @ViewChild('footer', { static: true }) footer: ElementRef;
  footerHeight: number;
  isHandsetLandscape: boolean;
  stylesToBeLoaded: boolean = false;
  loadScript: Promise<any>;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    @Inject(DOCUMENT) private document: any, private router: Router, private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    // private amplifyService: AmplifyService,
    public accountService: AccountService,
    public adobeDtbTracking: AdobeDtbTracking
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.observeBreakpoints();

    if (!isPlatformBrowser(this.platformId)) {
      let bases = this.document.getElementsByTagName('base');

      if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
      }
    }
  }

  ngAfterViewInit() {
    this.stylesToBeLoaded = true;
    if (environment.production == true || environment.uat == true) {
      this.loadjscssfile("../lazyloadedstyles.css", "css");
      this.loadjscssfile("../carousellazyloadedstyles.css", "css");
      this.loadjscssfile("../carouselslicklazyloadedstyles.css", "css");
      this.insertAdChoice();
    }//If production or uat, lazyload main css
    else {
      this.loadjscssfile("../lazyloadedstyles.js", "js");
    }

    if (environment.production) {
    }
    if (environment.production || environment.uat) {
      this.facebookImplementation();
      this.adobeImplementation();
    }
  }

  isLoggedIn() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      this.accountService.loggedIn = true;
      console.log(user)
    }
    )
      .catch(err => console.log(err));
    // this.amplifyService.authStateChange$
    //   .subscribe(authState => {
    //     if (authState.user) {
    //       this.accountService.loggedIn = true;
    //       // console.log(authState.user);
    //     }
    //   });
  }

  ngAfterViewChecked() {
    // set footer offset height for sticky and detect changes
    this.footerHeight = this.footer.nativeElement.offsetHeight;
    this.cdr.detectChanges();

  }

  observeBreakpoints() {
    this.breakpointObserver.observe(BREAKPOINTS).pipe(takeUntil
      (this.unsubscribeAll)).subscribe((result: BreakpointState) => {
        this.isPortrait = result.matches;
        this.isHandsetLandscape = this.breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)');
        // breakpoints for footer
      });
  }

  completeSubscription() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngOnDestroy() {
    this.completeSubscription();
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

  loadjscssfile(filename: string, filetype: string) {

    var thefileref;
    if (filetype == "js") { //if filename is a external JavaScript file
      let fileref = document.createElement('script')
      fileref.setAttribute("type", "text/javascript")
      fileref.setAttribute("src", filename)
      thefileref = fileref

    } else if (filetype == "css") { //if filename is an external CSS file
      let fileref = document.createElement("link")
      fileref.setAttribute("as", "style")
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || navigator.userAgent.toLowerCase().indexOf('msie') > -1 || navigator.appVersion.indexOf('Trident/') > -1) {//Do not use preload if using Firefox or Internet explorer
        fileref.setAttribute("rel", "stylesheet")

      } else {
        fileref.setAttribute("rel", "preload")
        fileref.onload = () => { fileref.rel = "stylesheet" };

      }
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename)
      thefileref = fileref
    }
    if (typeof thefileref != "undefined")
      document.getElementsByTagName("head")[0].appendChild(thefileref)
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

}
