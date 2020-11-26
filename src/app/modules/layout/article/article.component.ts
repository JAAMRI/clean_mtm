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
      content: '"Time is our most valuable resource. It’s precious. It’s something we can’t ever get back, and some days there just never seems to be enough of it."',
      readTime: '4min',
      url: 'jackys-deviled-eggs-recipe',
      image: '/assets/static_images/articles/jackys-deviled-eggs/finished-dish.jpeg'
    },
    {
      title: 'Kimia’s Middle Eastern Meatball Wrap',
      content: '"Cooking at home is more fun if you plan and have all ingredients ready to use. I usually find myself scrolling down my social media, getting lost in fancy recipes which looks appealing but confusing to make."',
      readTime: '2min',
      url: 'kimias-middle-eastern-meatball-wrap',
      image: '/assets/static_images/articles/kimias-meatball-wrap/finished-dish.jpg'
    },
    {
      title: 'Kirbys Japanese Macaroni Salad',
      content: '“I don’t know about you but I’m a huge fan of meal prepping and meal planning. As a food blogger and working professional with a Monday to Friday, "',
      readTime: '3min',
      url: 'kirbys-japanese-macaroni-salad',
      image: '/assets/static_images/articles/kirbys-japanese-mac-salad/finished-dish.jpg'
    },
    {
      title: 'Yiayia’s Greek Pastitsio (Lasagna) Recipe: Made with Love',
      content: '“Pastitsio is traditional Greek comfort food. Pasta layered with meat, cheese and a creamy Béchamel sauce that’s baked together to form Lasagna. "',
      readTime: '3min',
      url: 'yiayias-greek-pastitsio',
      image: '/assets/static_images/articles/yiayias-greek-pastitsio/finished-dish.jpg'
    },
    {
      title: 'Find Adventure in Food with my Korean Rice Bowl',
      content: '“For most of us, at this day and age, travelling the world is just a fading memory that we’re holding on oh so dearly. The experience of discovering new things, eating and drinking at new places, "',
      readTime: '2min',
      url: 'viranllys-korean-rice-bowl',
      image: '/assets/static_images/articles/viranllys-korean-rice-bowl/finished-dish.jpg'
    }

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
