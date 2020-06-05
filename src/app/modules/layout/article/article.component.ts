import { Component } from '@angular/core';
import { IArticle } from '../../../interfaces/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent  {

  constructor(private router: Router) {

  }

  articles: IArticle[] = [
    {
      title: 'WHAT AND WHAT NOT TO FREEZE',
      content: 'Freezing is a great way to retain the texture, flavour and colour of foods and can help you with your weekly menu planning so avoiding waste.',
      readTime: '5min',
      image: '/assets/static_images/articles/what-and-what-not-to-freeze.jpg'
    },
  
  ]

  routeToArticle(title: string) {
    this.router.navigate([this.router.url, title])
  }

}
