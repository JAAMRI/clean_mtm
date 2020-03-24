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

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any, private router: Router, private cdr: ChangeDetectorRef,
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
      this.insertAdChoice();
    }//If production or uat, lazyload main css
    else {
      this.loadjscssfile("../lazyloadedstyles.js", "js");
    }

    if (environment.production) {
      this.facebookImplementation();
      // this.adobeImplementation();
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
    let adobetext = ` function isMobile() {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/ | blackberry | blazer | compal | elaine | fennec | hiptop | iemobile | ip(hone | od) | iris | kindle | lge | maemo | midp | mmp | mobile.+ firefox | netfront | opera m(ob |in)i | palm(os) ?| phone | p(ixi | re) \/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
          .test(a)
          || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/ | capi | ccwa | cdm\-| cell | chtm | cldc | cmd\-| co(mp | nd) | craw | da(it | ll | ng) | dbte | dc\-s | devi | dica | dmob |do (c | p)o | ds(12 |\-d) | el(49 | ai) | em(l2 | ul) | er(ic | k0) | esl8 | ez([4 - 7]0 | os | wa | ze) | fetc | fly(\-| _) | g1 u | g560 | gene | gf\-5 | g\-mo | go(\.w | od) | gr(ad | un) | haie | hcit | hd\-(m | p | t) | hei\-| hi(pt | ta) | hp(i | ip) | hs\-c | ht(c(\-| | _ | a | g | p | s | t) | tp) | hu(aw | tc) | i\-(20 | go | ma) | i230 | iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/) | klon | kpt | kwc\-| kyo(c | k) | le(no | xi) | lg(g |\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/ | ma(te | ui | xo) | mc(01 | 21 | ca) | m\-cr | me(rc | ri) | mi(o8 | oa | ts) | mmef | mo(01 | 02 | bi | de |do| t(\-| | o | v) | zz)| mt(50 | p1 | v) | mwbp | mywa | n10[0 - 2] | n20[2 - 3] | n30(0 | 2) | n50(0 | 2 | 5) | n7(0(0 | 1) | 10) | ne((c | m) \-| on | tf | wf | wg | wt) | nok(6 | i) | nzph | o2im | op(ti | wv) | oran | owg1 | p800 | pan(a | d | t) | pdxg | pg(13 |\-([1 - 8] | c)) | phil | pire | pl(ay | uc) | pn\-2 | po(ck | rt | se) | prox | psio | pt\-g | qa\-a | qc(07 | 12 | 21 | 32 | 60 |\-[2 - 7] | i\-) | qtek | r380 | r600 | raks | rim9 | ro(ve | zo) | s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/ | se(c(\-| 0 | 1) | 47 | mc | nd | ri) | sgh\-| shar | sie(\-| m) | sk\-0 | sl(45 | id) | sm(al | ar | b3 | it | t5) | so(ft | ny) | sp(01 | h\-| v\-| v) | sy(01 | mb) | t2(18 | 50) | t6(00 | 10 | 18) | ta(gt | lk) | tcl\-| tdg\-| tel(i | m) | tim\-| t\-mo | to(pl | sh) | ts(70 | m\-| m3 | m5) | tx\-9 | up(\.b | g1 | si) | utst | v400 | v750 | veri | vi(rg | te) | vk(40 | 5[0 - 3] |\-v) | vm40 | voda | vulc | vx(52 | 53 | 60 | 61 | 70 | 80 | 81 | 83 | 85 | 98) | w3c(\-| ) | webc | whit | wi(g | nc | nw) | wmlb | wonu | x700 | yas\-| your | zeto | zte\-/i
            .test(a.substr(0, 4))) {
          check = true;
        }
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }
    var channelVal;
    if (isMobile()) {
      channelVal = "Mobile Site";
    } else {
      channelVal = "Brand Site";
    }
    window.digitalData = {
      siteInfo: {
        channel: '',
        sitetype: 'Non-Avinash/Non-D2/CMS Name'
      },
      page: {
        pageInfo: {
          destinationURL: "DESTINATION URL-To be set on link clicks"
        },
        category: {
          pageType: "PAGE TYPE-To be set on each page change"
        }
      },
      video: [],
      campaign: [],
      product: [],
      privacy: {
        accessCategories: [{
          domains: []
        }]
      },
      component: [],
      trackingInfo: {
        GID: '',
        "un": "",
        tool: [{
          ids: ""
        }]
      },
      promotion: []
    }
    digitalData.sitespeed = {},
      digitalData.siteInfo.channel = channelVal;
    digitalData.page.category.primaryCategory = channelVal;
    digitalData.trackingInfo = {};
    digitalData.trackingInfo.tool = [{}];
    digitalData.privacy = {};
    digitalData.page.attributes = {};
    digitalData.privacy.accessCategories = [{}];
    digitalData.privacy.accessCategories[0].domains = [];
    digitalData.event = [];
    digitalData.page.pageInfo.pageName = "HOME";
    digitalData.page.pageInfo.language = "EN";
    // digitalData.page.category.subCategory1 = "SITE SECTION 1";
    // digitalData.page.category.subCategory2 = "SITE SECTION 2"
    // digitalData.page.category.subCategory3 = "SITE SECTION 3";
    digitalData.page.attributes.contentType = "Meals That Matter";
    // digitalData.page.attributes.articleName = "ARTICLE NAME - populate only on Article pages"
    digitalData.page.attributes.brandCategory = 'FOOD';
    digitalData.page.attributes.country = 'CA';
    digitalData.page.attributes.globalBrand = 'Meals That Matter';
    digitalData.page.attributes.localBrand = 'Meals That Matter';
    digitalData.trackingInfo.tool[0].id = "UA-144474007-1";
    digitalData.event * [];`;

    this.loadScript = new Promise((resolve) => {
      let node = document.createElement('script');
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      try {
        node.appendChild(document.createTextNode(adobetext));
        document.getElementsByTagName('head')[0].appendChild(node);
      } catch (e) {
        node.text = adobetext;
        document.body.appendChild(node);
      }

    });
    this.loadScript = new Promise((resolve) => {
      let nodeAdobeScript = document.createElement('script');
      nodeAdobeScript.type = 'text/javascript';
      nodeAdobeScript.async = true;
      nodeAdobeScript.charset = 'utf-8';
      nodeAdobeScript.src = '//assets.adobedtm.com/launch-EN0ed0003810f9435a8566fef4c9d7b320.min.js?ngsw-bypas';
      try {
        // nodeAdobeScript.appendChild(document.createTextNode(adobetext));
        document.getElementsByTagName('head')[0].appendChild(nodeAdobeScript);
      } catch (e) {
        // node.text = adobetext;
        document.body.appendChild(nodeAdobeScript);
      }
    });
  }

}
