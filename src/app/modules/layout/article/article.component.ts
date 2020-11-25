import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IArticle } from '../../../interfaces/article';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  articles: IArticle[] = [
    {
      title: 'What and what not to freeze',
      content: 'Freezing is a great way to retain the texture, flavour and colour of foods and can help you with your weekly menu planning so avoiding waste.',
      readTime: '3min',
      url: 'what-and-what-not-to-freeze',
      image: '/assets/static_images/articles/what-and-what-not-to-freeze/what-and-what-not-to-freeze.jpg'
    },
    {
      title: 'Jackys Devilled Eggs',
      content: 'Time is our most valuable resource. It’s precious. It’s something we can’t ever get back, and some days there just never seems to be enough of it.”',
      readTime: '4min',
      url: 'jackys-deviled-eggs-recipe',
      image: '/assets/static_images/articles/jackys-deviled-eggs/finished-dish.jpeg'
    },

  ]

  constructor(public adobeDtbTracking: AdobeDtbTracking,
    private seoService: SeoService,
    private router: Router
  ) {

  }

  

  ngOnInit() {
    this.seoService.generateTags({
      title: 'Articles | Meals That Matter',
      description: 'Welcome to the all-in-one meal preparation tool, where you can choose from a wide range of seasonal and flavorful recipes to take your meal prep for the week to a whole new level!',
      slug: this.router.url
    })
  }

  track(title: string) {
    this.adobeDtbTracking.anchorLink(`Link to article: ${title}`);

  }

}
