import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { INSTRUCTIONS } from './meal-instructions.mock';

@Component({
  selector: 'app-meal-tab',
  templateUrl: './meal-tab.component.html',
  styleUrls: ['./meal-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MealTabComponent implements OnInit {

  @Input() data: any;
  @Input() isMobile: any;

  constructor() { }

  ngOnInit() {
  }

}
