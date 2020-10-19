import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetHelperService {
  widget: HTMLScriptElement;

  constructor() { }

  embedWidget() {
    this.widget = document.createElement('script');
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
