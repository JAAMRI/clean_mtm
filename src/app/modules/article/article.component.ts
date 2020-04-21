import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  unsubscribeAll = new Subject();
  articles: string[] = ['what-and-what-not-to-freeze'];
  showArticle: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadArticleBasedOffRoute()
  }

  loadArticleBasedOffRoute(): void {
    this.route.params.pipe(takeUntil(this.unsubscribeAll)).subscribe((params: ParamMap) => {
      //  watch route and load article depending on route id
      if (params['id']) {
        const article = params['id'];
        if (this.articles.includes(article)) {
          this.loadArticle(article);
        } else {
          this.router.navigate(['/recipes/discover']);
        }
      } else {
        this.router.navigate(['/recipes/discover']);

      }
    })
  }

  loadArticle(article: string) {
    // initially just show the 'what-and-what-not-to-freeze article until there are more
    this.showArticle = true;
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
