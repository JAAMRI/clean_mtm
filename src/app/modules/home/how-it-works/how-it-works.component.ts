import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  steps = [
    {
      icon: 'assets/static_images/noun_recipes_1132517.svg',
      name: 'BROWSE OUR RECIPES',
    },
    {
      icon: 'assets/static_images/noun_Browser_83393.svg',
      name: 'CREATE MEAL PLAN',
    },
    {
      icon: 'assets/static_images/noun_Shopping Cart_2776002.svg',
      name: 'SHOP YOUR MEAL PLAN'
    }
  ]; // icons

  @Input() isMobile: boolean;

  constructor(
    private matIconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer, 
  ) {}

  createStepIcons() {
    this.steps.forEach((step) => {
      this.matIconRegistry.addSvgIcon(step.name, this.sanitizer.bypassSecurityTrustResourceUrl(step.icon));
    });
    this.matIconRegistry.addSvgIcon('right-arrow', this.sanitizer.bypassSecurityTrustResourceUrl('assets/static_images/right-arrow.svg'));
    // creating step icons for carousel

  }

  ngOnInit(): void {
    this.createStepIcons();
  }

}
