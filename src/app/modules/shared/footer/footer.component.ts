import { Component, HostListener, Inject, LOCALE_ID } from '@angular/core';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';
import { SocialFooterItems } from './footer.items';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  socialFooterItems = SocialFooterItems;
  isMobile = window.innerWidth < 1024;
  isFrench = this.locale === 'fr';
  constructor(public adobeDtbTracking: AdobeDtbTracking,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 1024;
  }

}
