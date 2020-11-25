import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { WhatAndWhatNotToFreeze } from '../articles/what-and-what-not-to-freeze';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  articles = {
    'what-and-what-not-to-freeze': WhatAndWhatNotToFreeze
  }
  articleId: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadArticleBasedOffRoute()
  }

  loadArticleBasedOffRoute(): void {
    this.articleId = this.route.snapshot.params['id'];
    if (!this.articles[this.articleId]) {
      this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" });
    }
  }

}
