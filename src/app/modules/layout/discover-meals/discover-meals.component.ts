import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from '../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { scrollToTop } from '../../../../app/utilities/helper-functions';
import { FilterComponent } from '../../../components/dialogs/filter/filter.component';
import { Meals } from '../../../interfaces/meal/meal';
import { MealService } from '../../../services/meal/meal.service';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { IFilter } from '../../../components/dialogs/filter/filter.data';

@Component({
  selector: 'app-discover-meals',
  templateUrl: './discover-meals.component.html',
  styleUrls: ['./discover-meals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverMealsComponent implements OnInit, AfterViewInit, OnDestroy {

  meals: any[] = [];
  favouriteMeals: any = []
  loading = false;
  viewLoaded: boolean = false;
  searchQuery: string;
  didYouMean: string;
  unsubscribeAll = new Subject();
  favouriteMealIds: any = [];
  pageStart: number = 0;
  pageSize: number = 5;//If you change this value, please change it in the search function in the meal service as well
  theEnteredSearchQuery: string = "";
  totalResults: number = 0;
  mealPlanIds = {};
  mealPlan = [];
  filter = {};
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;


  constructor(private router: Router, private dialog: MatDialog,
    private route: ActivatedRoute,
    private mealFavouritesService: MealFavouritesService,
    private mealPlanService: MealPlanService,
    private mealService: MealService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public adobeDtbTracking: AdobeDtbTracking
  ) {
  }

  async ngOnInit() {
    scrollToTop();
    this.adobeDtbTracking.pageLoad("discover meals page");
    this.watchRouteForRecipePrompt()
    this.mealPlan = await this.mealPlanService.getMealPlan();
    await this.getFavouriteMeals();

    this.getMeals();
  }

  ngAfterViewInit() {
    this.viewLoaded = true;
    this.cdr.detectChanges();
  }

  watchRouteForRecipePrompt() {
    this.route.queryParams.pipe(takeUntil(this.unsubscribeAll)).subscribe((params) => {
      if (params.id) {
        this.promptMealDetailComponent(params.id)
      }
    })
  }

  getNextBatch(index: number) {
    const end = this.viewPort.getRenderedRange().end;
    const total = this.viewPort.getDataLength();
    if (index === this.meals.length -1) {
      this.getMeals(this.meals.length, this.pageSize, '')
    }
  }

  trackByIndex(i: number) {
    return i;
  }

  getMeals(pageStart: number = this.pageStart, pageSize: number = this.pageSize, query?: string, options: any = this.filter) {
    //Show spinner while loading
    this.loading = true;
    this.mealService.getMeals(pageStart, pageSize, query, options).pipe(takeUntil(this.unsubscribeAll)).subscribe(async (meals: Meals) => {
      if (meals) {
        //Check if did_you_mean
        this.didYouMean = meals.didYouMean;
        if (meals.didYouMean && meals.items.length === 0) {
          // if did you mean exists, still search for those results
          this.searchMeals(this.didYouMean);
        }
        //Reset page start
        this.pageStart = pageStart;

        // Populate meals
        if (pageStart < meals.results) {
          this.meals = [...this.meals, ...meals.items.slice(0, pageSize + 1)]
        }
        if (pageStart === 0) {
          setTimeout(() => {
            this.scrollToMiddle(); // skip a cycle           
          }, 0)
        }
        //Set meal plan IDs
        this.setMealPlanIds()
        // get favourite meals

      }

      this.loading = false;

    });
  }

  scrollToMiddle() {
    const slider = this.viewPort.getElementRef();
    const scrollbarWidth = slider.nativeElement.offsetWidth;
    const sliderWidth = slider.nativeElement.scrollWidth

    // scroll half way, but come back half way of the scroll bar to have it in the middle (16 accounted for the 1em grid gap)
    slider.nativeElement.scrollLeft = ( (sliderWidth/ 2) - ( scrollbarWidth/2)); 
  }

  async getFavouriteMeals() {
    this.favouriteMeals = await this.mealFavouritesService.getMealFavourites();
    if (this.favouriteMeals && Array.isArray(this.favouriteMeals)) {
      this.favouriteMeals.map((meal) => meal.id).forEach((mealId) => {
        this.favouriteMealIds[mealId] = true;
      })
    } else {
      this.favouriteMeals = [];
    }
  }

  setMealPlanIds() {
    this.mealPlan.forEach((userMeal: any) => {
      this.mealPlanIds[userMeal.id] = true
    });
  }

  searchMeals(query?: string) {
    //Capture Enter Submit Event
    if (query && query.trim() == "") {//check if search field is cleared
      this.theEnteredSearchQuery = "";
    } else {
      this.theEnteredSearchQuery = query;
    }
    this.resetAllGlobalValues();
    this.getMeals(this.pageStart, this.pageSize, query);
    if (query != "") {
      this.adobeDtbTracking.searchQuery(query, this.pageSize);
    }
    //Reset Search Query
    this.searchQuery = "";
  }

  resetAllGlobalValues() {
    this.meals = [];
    this.pageStart = 0;
    this.pageSize = 5;
  }

  renderFilterDialog() {
    const filterDialog = this.dialog.open(FilterComponent);
    filterDialog.afterClosed().pipe(takeUntil(this.unsubscribeAll)).subscribe((filter: IFilter) => {
      if (filter) {
        setTimeout(() => {
          
          document.body.click()
        }, 1000)
        this.filter = filter;
        this.searchMeals();
      }
    })

  }


  setSearchQuery() {
    this.searchQuery = this.didYouMean;
    this.didYouMean = null;
  }

  visitMealPlan() {
    this.router.navigate(['/recipes/my-meals']);
    this.adobeDtbTracking.pageTracking('MEAL PLAN', '/recipes/my-meals');
  }

  visitMealDetailPage(meal: any) {
    this.promptMealDetailComponent(meal.id);
    this.adobeDtbTracking.anchorLinkMeal('On Discover Meals Page, Viewing Meal Detail for: ', meal.title);
  }

  promptMealDetailComponent(id: string) {
    // if carousel is not being slided
    // this.router.navigate([`/recipes/${id}`]);
    const ref = this.dialog.open(MealDetailComponent, {
      panelClass: 'recipe-dialog-container',
      backdropClass: 'faded-backdrop',
      data: { id }
    });
    ref.componentInstance.dialogParams = {
      onAddOrRemoveMealPlan: (fromDialog: any) => {
        //this will update added to meal plan in parent component
        (fromDialog.action === 'add') ? this.mealPlanIds[fromDialog.meal.id] = true : delete this.mealPlanIds[fromDialog.meal.id];

      },
      onAddOrRemoveFavourites: (fromDialog: any) => {//Action coming from dialog
        //this will update added to update in parent component
        (fromDialog.action === 'add') ? this.favouriteMealIds.push(fromDialog.meal.id) : this.favouriteMealIds = this.favouriteMealIds.filter(id => id !== fromDialog.meal.id)

      }
    }
    ref.afterClosed().toPromise().then((newDialog: string) => {
      if (!newDialog) {
        // if no new dialog is openning
        this.router.navigate(['/recipes/discover'], { queryParams: {} })
      }
    })

  }

  promptUserForAuth() {
    this.router.navigate(['/auth']);
  }

  async addToMealPlan(mealId: string) {
    // add to mealplan
    const meal = this.meals.find((meal) => meal.id === mealId);
    this.adobeDtbTracking.anchorLinkMeal('Adding to Meal Plan: ', meal.title);
    this.mealPlan.push(meal);
    this.mealPlanIds[mealId] = true;
    await this.mealPlanService.saveMealPlan(this.mealPlan, mealId);
    this.snackBar.open('Added to meal plan!', null, { duration: 2000, verticalPosition: 'top' });

  }

  async removeFromMealPlan(mealId: string) {
    // add to mealplan
    await this.mealPlanService.saveMealPlan(this.mealPlan, mealId, 'remove');
    this.mealPlan = this.mealPlan.filter((meal) => meal.id !== mealId)
    delete this.mealPlanIds[mealId];
    const meal = this.meals.find((meal) => meal.id === mealId);
    this.adobeDtbTracking.anchorLinkMeal('Removing from Meal Plan: ', meal.title);
    this.snackBar.open('Removed from meal plan!', null, { duration: 2000, verticalPosition: 'top' });
  }

  updateFavourites(favouriteMeal: any) {

    if (this.favouriteMeals.find((meal: any) => meal.id == favouriteMeal.id)) {
      this.removeFromFavourites(favouriteMeal);
      this.snackBar.open('Removed from favourites!', null, { duration: 2000, verticalPosition: 'top' });

    } else {
      this.addToFavourites(favouriteMeal);
      this.snackBar.open('Added to favourites!', null, { duration: 2000, verticalPosition: 'top' });

    }

  }

  async removeFromFavourites(favouriteMeal: any) {
    await this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id, 'remove');
    this.favouriteMeals = this.favouriteMeals.filter((meal: any) => meal.id !== favouriteMeal.id)
    delete this.favouriteMealIds[favouriteMeal.id];
    const meal = this.meals.find((meal) => meal.id === favouriteMeal.id);
    this.adobeDtbTracking.anchorLinkMeal('Removing from Favourites: ', meal.title);
  }

  addToFavourites(favouriteMeal: any) {
    this.favouriteMeals.push(favouriteMeal)
    this.favouriteMealIds[favouriteMeal.id] = true;
    this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id);
    const meal = this.meals.find((meal) => meal.id === favouriteMeal.id);
    this.adobeDtbTracking.anchorLinkMeal('Adding to Favourites: ', meal.title);
  }

  loadMore() {
    const newPageStart = this.meals.length;
    this.getMeals(newPageStart, this.pageSize, this.theEnteredSearchQuery || '');
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
