import { Inject, Injectable, LOCALE_ID } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
  id?: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'new-relic', src: '/assets/scripts/new-relic.js' },
  { name: "pixel-min", src: 'https://js.adsrvr.org/up_loader.1.1.0.js' },
  { name: "pixel", src: '/assets/scripts/pixel.js' },
  { name: "awareness-amazon", src: '/assets/scripts/awareness-amazon.js' },
  { name: "loyalty-amazon", src: '/assets/scripts/loyalty-amazon.js' },
  { name: 'adobe-tracking', src: '/assets/scripts/adobe-tracking.js' },
  { name: 'adobe-analytics', src: '/assets/scripts/adobe-analytics.js' },
  { name: 'hot-jar', src: '/assets/scripts/hot-jar.js' },
  { name: 'facebook-pixel', src: '/assets/scripts/facebook-pixel.js' },
  { name: 'bodyhiding', src: 'assets/scripts/bodyhiding.js' },
  { name: 'pinterest', src: 'assets/scripts/pinterest.js', },
  { name: 'grocery-list', src: 'assets/scripts/grocery-list.js', id: 'grocery-list' },
  { name: 'grocery-list-fr', src: 'assets/scripts/grocery-list-fr.js', id: 'grocery-list' },
  { name: 'grocery-list-uat', src: 'assets/scripts/grocery-list-uat.js', id: 'grocery-list' },
  { name: 'grocery-list-uat-fr', src: 'assets/scripts/grocery-list-uat-fr.js', id: 'grocery-list' },
  { name: 'adobe-tracking-min', src: '//assets.adobedtm.com/launch-EN0ed0003810f9435a8566fef4c9d7b320.min.js' },
  { name: 'sales-force-live-agent', src: 'https://c.la1-c2-lo2.salesforceliveagent.com/content/g/js/47.0/deployment.js' },
];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor(@Inject(LOCALE_ID) public locale: string) {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
      // an object here to let us know whethere the script is loaded and the src of it
    });
  }

  unload(id: string) {
    const doc = document.getElementById(id);
    doc.remove();
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    // load each script from parameters
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    // return and resolve all promises from scripts
    return Promise.all(promises);
  }

  loadInFooter(...scripts: string[]) {
    const promises: any[] = [];
    // load each script from parameters
    scripts.forEach((script) => promises.push(this.loadScriptInFooter(script)));
    // return and resolve all promises from scripts
    return Promise.all(promises);
  }

  loadScriptInFooter(name: string) {
    return new Promise((resolve, reject) => {
      // check if script is loaded. if not load script
      if (!this.scripts[name].loaded) {

        //load script
        // create script
        let script = document.createElement('script');
        // script type
        script.type = 'text/javascript';
        // script src is the src from our scripts obj
        script.src = this.scripts[name].src;
        if (script.readyState) {
          //Only for internet explorer
          // load script and resolve promise
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  //Others
          // load script and resolve promise
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        // set on error handler function. resolve the promise with not loaded is false
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        // add this script to the header
        document.getElementsByTagName('footer')[0].appendChild(script);
      } else {
        // if the script is already loaded then resolve the promise
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // check if script is loaded. if not load script
      if (!this.scripts[name].loaded) {
        //load script
        // create script
        let script = document.createElement('script');
        // script type
        script.type = 'text/javascript';
        // script src is the src from our scripts obj
        script.src = this.scripts[name].src;

        script.id = name;

        if (script.readyState) {
          //Only for internet explorer
          // load script and resolve promise
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  //Others
          // load script and resolve promise
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        // set on error handler function. resolve the promise with not loaded is false
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        // add this script to the header
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        // if the script is already loaded then resolve the promise
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

  insertAdChoice() {
    const isFrench = (this.locale === 'fr');
    // return;
    //AdChoice
    if (isFrench) {
      this.loadFrenchAdChoice()
    } else {
      this.loadEnglishAdChoice()
    }
  }

  loadEnglishAdChoice() {
    (function () {
      var ev = document.createElement('script');
      ev.type = 'text/javascript';
      ev.async = true; ev.setAttribute('data-ev-tag-pid', '20844');
      ev.setAttribute('data-ev-tag-ocid', '6368');
      ev.setAttribute("rel", "prefetch");
      ev.src = '//c.evidon.com/pub/tag.js';
      ev.defer = true;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ev, s);
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

  }
  loadFrenchAdChoice() {
    (function () {
      var ev = document.createElement('script');
      ev.type = 'text/javascript';
      ev.async = true;
      ev.setAttribute('data-ev-tag-pid', 22473);
      ev.setAttribute('data-ev-tag-ocid', 6368);
      ev.src = '//c.evidon.com/pub/tag.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ev, s);
    })();
    (function (id, cid, cb) { 
      var d = document, s = d.createElement('script'), ts = d.getElementsByTagName('script')[0]; 
      s.type = 'text/javascript'; 
      s.async = true; 
      s.setAttribute('data-ev-noticeid', id); 
      s.setAttribute('data-ev-coid', cid); 
      s.setAttribute('data-ev-consent-callback', cb); 
      s.setAttribute('data-ev-consent-type', 'cn'); 
      s.src = '//c.evidon.com/pub/gdprnotice.js'; 
      ts.parentNode.insertBefore(s, ts); })(22473, 6368, 'g_consentGiven');
  }

}  