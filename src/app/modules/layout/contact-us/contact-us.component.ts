import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { embedChatWidget } from './live-chat-helper';
import { SeoService } from '../../../services/seo.service';
import { Title } from '@angular/platform-browser';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';
import { DynamicScriptLoaderService } from '../../../services/dynamic-script-loader/dynamic-script-loader.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private router: Router, 
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private sharedService: SharedService, private seo: SeoService, private title: Title, public adobeDtbTracking: AdobeDtbTracking) { }

  ngOnInit() {
    setTimeout(() => {
      this.adobeDtbTracking.pageLoad("contact us page");
    },
      5000);

    if (!this.sharedService.chatPageVisited) {
      this.dynamicScriptLoader.loadScript('sales-force-live-agent');
      embedChatWidget();

      this.sharedService.chatPageVisited = true
    }
    this.title.setTitle('Contact Us | Meals That Matter'); //updating page title
    this.seo.generateTags({
      title: 'Contact Us | Meals That Matter',
      description: 'Get in touch with us, we’d love to hear from you!',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/contact-us'
    })
  }

  stopPropogation(event: any) {
    event.stopPropagation();
    this.adobeDtbTracking.contactUs('Email');
  }

  startLiveChat(event: any) {
    event.stopPropagation();
    this.router.navigate(['/contact-us/live-chat'])
  }

}