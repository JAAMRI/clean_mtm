import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  articles = [
    'what-and-what-not-to-freeze',
    'jackys-deviled-eggs-recipe',
  ]
  articleId: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadArticleBasedOffRoute()
  }

  loadArticleBasedOffRoute(): void {
    this.articleId = this.route.snapshot.params['id'];
    if (!this.articles.includes(this.articleId)) {
      this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" });
    }
  }

}