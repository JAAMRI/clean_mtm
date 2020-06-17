import { Component, HostListener } from '@angular/core';
import { AdobeDtbTracking } from '../../services/adobe_dtb_tracking.service';
import { FooterItems } from './footer.items';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerItems = FooterItems;
  isMobile = window.innerWidth < 1024;

  constructor(public adobeDtbTracking: AdobeDtbTracking,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 1024;
  }




}
