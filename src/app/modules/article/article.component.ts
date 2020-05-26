import { Component } from '@angular/core';
import { IArticle } from '../../interfaces/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent  {

  constructor(private router: Router) {

  }

  mockArticles: IArticle[] = [
    {
      title: 'Lorem Ipsum',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque aliquid dolorem harum soluta nemo id nobis velit, facilis nesciunt temporibus.',
      readTime: '8min',
      image: '/assets/static_images/articles/what-and-what-not-to-freeze.jpg'
    },
    {
      title: 'Lorem Ipsum',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque aliquid dolorem harum soluta nemo id nobis velit, facilis nesciunt temporibus.',
      readTime: '8min',
      image: '/assets/static_images/articles/what-and-what-not-to-freeze.jpg'
    },
    {
      title: 'Lorem Ipsum',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque aliquid dolorem harum soluta nemo id nobis velit, facilis nesciunt temporibus.',
      readTime: '8min',
      image: '/assets/static_images/articles/what-and-what-not-to-freeze.jpg'
    },
  ]

  routeToArticle(title: string) {
    this.router.navigate([this.router.url, title])
  }

}
