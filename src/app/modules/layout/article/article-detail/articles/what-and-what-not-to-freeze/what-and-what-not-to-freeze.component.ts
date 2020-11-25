import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../../../../services/seo.service';

@Component({
  selector: 'app-what-and-what-not-to-freeze',
  templateUrl: './what-and-what-not-to-freeze.component.html',
  styleUrls: ['./what-and-what-not-to-freeze.component.scss']
})
export class WhatAndWhatNotToFreezeComponent implements OnInit {

  constructor(private seoService: SeoService, private router: Router) { }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'What and What Not To Freeze| Meals That Matter',
      description: 'Welcome to the all-in-one meal preparation tool, where you can choose from a wide range of seasonal and flavorful recipes to take your meal prep for the week to a whole new level!',
      slug: this.router.url
    })
  }

}
