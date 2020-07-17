import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetHelperService {
  widget: HTMLScriptElement;

  constructor() { }

  embedWidget() {
    this.widget = document.createElement('script');
    this.widget.innerHTML = `(function(a,b,c,d,e,f,g){a[d]=a[d]||function(){(a[d].q=a[d].q||[])
      .push(arguments)};f=b.createElement(c);f.src=e+'?'+(Date.now()/3.6e+6)
      .toFixed();g=b.querySelector(c);g.parentNode.insertBefore(f,g)})
      (window,document,'script','constantco','https://cdn.constant.co/app/mealsthatmatterca/cc.js');`;
    // document.head.appendChild(this.widget);
    document.getElementsByTagName('head')[0].appendChild(this.widget);
  }

  openWidget() {
    const widget = document.getElementsByClassName('cc-side-drawer-anchor')[0] as any;
    widget.click();
  }

  showWidget() {
    const widget = document.getElementsByClassName('cc-side-drawer-anchor')[0] as any;
    widget.style.cssText = 'display:unset !important';
  }

  hideWidget() {
    const widget = document.getElementsByClassName('cc-side-drawer-anchor')[0] as any;
    widget.style.cssText = 'display:none !important';
  }

  removeWidget() {
    if (this.widget) {
      this.widget.parentNode.removeChild(this.widget);
    }
  }
}
