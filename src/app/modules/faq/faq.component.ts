import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { SeoService } from '../../services/seo.service';
import { Title } from '@angular/platform-browser';
import { AdobeDtbTracking } from '../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  constructor(private router: Router, private sharedService: SharedService, private seo: SeoService, private title: Title, public adobeDtbTracking: AdobeDtbTracking) { }

  ngOnInit() {
    this.scrollToTop();
    setTimeout(() => {
      this.adobeDtbTracking.page_load("faq page");
    },
      5000);
    this.title.setTitle('FAQs - Meals That Matter'); //updating page title
    this.seo.generateTags({
      title: 'FAQs - Meals That Matter',
      description: 'Frequently Asked Questions MTM',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/recipes/faqs'
    })
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
