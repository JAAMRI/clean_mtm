import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdobeDtbTracking } from '../../../../../app/services/adobe_dtb_tracking.service';
import { MealPlanService } from '../../../../../app/services/meal-plan/meal-plan.service';
import { SeoService } from '../../../../../app/services/seo.service';
import { SharedService } from '../../../../../app/shared/shared.service';
import { scrollToTop } from '../../../../../app/utilities/helper-functions';
import { DynamicScriptLoaderService } from '../../../../services/dynamic-script-loader/dynamic-script-loader.service';
import { WidgetHelperService } from '../../../../services/widget-helper/widget-helper.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class GroceryListComponent implements OnInit {
  unsubscribeAll = new Subject();
  groceryListWidget: string;
  isMealPlanEmpty: boolean = false;

  // creating array of distinct category names

  constructor(private mealPlanService: MealPlanService,
    private sharedService: SharedService,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private seo: SeoService,
    private title: Title,
    public adobeDtbTracking: AdobeDtbTracking
  ) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.adobeDtbTracking.pageLoad("grocery list page");
    },
      5000);
    this.loadGroceryListWidget()

    scrollToTop();

    this.mealPlanService.getMealPlan().then((recipes) => {
      if (recipes.length > 0) {
        const recipeIds = recipes.map((meal: any) => meal.id);
        this.buildGroceryListWidget(recipeIds)
      } else {
        this.isMealPlanEmpty = true;
      }
    })
    this.title.setTitle('Grocery List – Your Ingredients | Meals That Matter'); //updating page title
    this.seo.generateTags({
      title: 'Grocery List – Your Ingredients | Meals That Matter',
      description: 'View your weekly grocery list, tailored to you and based off your chosen meals.  Shop direct or SMS, email or print your groceries for added convenience!',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/recipes/grocery-list'
    })

  }

  loadGroceryListWidget() {
    if (!this.sharedService.groceryListPageVisited) {
      this.dynamicScriptLoader.load('grocery-list').then((data: any) => {
        console.log('Grocery list loaded');
        this.sharedService.groceryListPageVisited = true
      }).catch(console.error)
    }
  }

  buildGroceryListWidget(itemIds: any) {
    let recipeIds = '';
    itemIds.forEach((itemId: any, index: number) => {
      recipeIds += itemId + ((index !== (itemIds.length - 1)) ? ',' : '');
    });
    this.groceryListWidget =
      `<div class="cc-mealplan-details-container" recipe-ids="${recipeIds}"></div>`;

  }
}
