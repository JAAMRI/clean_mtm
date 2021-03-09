import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { SeoService } from '../../../services/seo.service';
import { Title } from '@angular/platform-browser';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  constructor(private seo: SeoService, private title: Title, public adobeDtbTracking: AdobeDtbTracking) { }

  ngOnInit() {
    this.scrollToTop();
    setTimeout(() => {
      this.adobeDtbTracking.pageLoad("faq page");
    },
      5000);
    this.title.setTitle('FAQs - Meals That Matter'); //updating page title
    this.seo.generateTags({
      title: $localize`FAQs - Meals That Matter`,
      description: 'Frequently Asked Questions MTM',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/faqs'
    })
  }

  track() {
    this.adobeDtbTracking.socialMediaTracking('QUICK DEMO LINK', 'https://www.youtube.com/watch?v=sfGbvNX3Y9o&feature=youtu.be');
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
