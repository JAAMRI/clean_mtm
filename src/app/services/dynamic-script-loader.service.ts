import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'adobe-tracking', src: '../../assets/scripts/adobe-tracking.js' },
  { name: 'adobe-tracking-min', src: '//assets.adobedtm.com/launch-EN0ed0003810f9435a8566fef4c9d7b320.min.js' }
];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
      // an object here to let us know whethere the script is loaded and the src of it
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    // load each script from parameters
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    // return and resolve all promises from scripts
    return Promise.all(promises);
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

}