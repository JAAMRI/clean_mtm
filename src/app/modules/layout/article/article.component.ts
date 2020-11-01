import { Component } from '@angular/core';
import { IArticle } from '../../../interfaces/article';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  constructor(public adobeDtbTracking: AdobeDtbTracking,
  ) {

  }

  articles: IArticle[] = [
    {
      title: 'What and what not to freeze',
      content: 'Freezing is a great way to retain the texture, flavour and colour of foods and can help you with your weekly menu planning so avoiding waste.',
      readTime: '3min',
      url: 'what-and-what-not-to-freeze',
      image: '/assets/static_images/articles/what-and-what-not-to-freeze.jpg'
    },

  ]

  track(title: string) {
    this.adobeDtbTracking.anchorLink(`Link to article: ${title}`);

  }

}
