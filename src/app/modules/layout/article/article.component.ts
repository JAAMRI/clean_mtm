import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { IArticle } from '../../../interfaces/article';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';
import { SeoService } from '../../../services/seo.service';
import { EnglishArticles } from './english-articles';
import { FrenchArticles } from './french-articles';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  articles: IArticle[] = []

  constructor(public adobeDtbTracking: AdobeDtbTracking,
    private seoService: SeoService,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
  ) {

  }

  

  ngOnInit() {
    this.setTags();
    if (this.locale !== 'fr') {
      this.articles = EnglishArticles;
    } else {
      this.articles = FrenchArticles;
    }
    
  }

  setTags() {
    this.seoService.generateTags({
      title: $localize`Articles | Meals That Matter`,
      description: 'Welcome to the all-in-one meal preparation tool, where you can choose from a wide range of seasonal and flavorful recipes to take your meal prep for the week to a whole new level!',
      slug: this.router.url
    })
  }

  track(title: string) {
    this.adobeDtbTracking.anchorLink(`Link to article: ${title}`);

  }

}
