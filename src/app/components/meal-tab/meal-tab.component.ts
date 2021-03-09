import { Component, OnInit, Input } from '@angular/core';
import { INSTRUCTIONS } from './meal-instructions.mock';

@Component({
  selector: 'app-meal-tab',
  templateUrl: './meal-tab.component.html',
  styleUrls: ['./meal-tab.component.scss']
})
export class MealTabComponent implements OnInit {

  @Input() data: any;
  @Input() isMobile: any;

  constructor() { }

  ngOnInit() {
  }

}
