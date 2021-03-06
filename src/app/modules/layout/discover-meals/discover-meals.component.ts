import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { scrollToTop } from '../../../../app/utilities/helper-functions';
import { environment } from '../../../../environments/environment';
import { FilterComponent } from '../../../components/dialogs/filter/filter.component';
import { FilterIdsByName, IFilter } from '../../../components/dialogs/filter/filter.data';
import { Meals } from '../../../interfaces/meal/meal';
import { MealService } from '../../../services/meal/meal.service';
import { SeoService } from '../../../services/seo.service';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';
import { RecipeInformationByFilterName } from './discover-meals.data';

@Component({
  selector: 'app-discover-meals',
  templateUrl: './discover-meals.component.html',
  styleUrls: ['./discover-meals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DiscoverMealsComponent implements OnInit, AfterViewInit, OnDestroy {

  defaultPageTitle = $localize`select recipes`;
  production = environment.production; // check if env is prod
  meals: any = [];
  favouriteMeals: any = []
  loading = false;
  isReady: boolean = false;
  searchQuery: string;
  didYouMean: string;
  unsubscribeAll = new Subject();
  favouriteMealIds: any = {};
  pageTitle = this.defaultPageTitle;
  pageDescription = '';
  pageStart: number = 0;
  pageSize: number = 5;//If you change this value, please change it in the search function in the meal service as well
  totalResults: number = 0;
  mealPlanIds = {};
  mealPlan = [];
  filter = {};
  activeFilterName: string;
  leftPageStart = 0;
  numOfResults = 0;
  error: string = '';
  isMobile = (window.innerWidth < 1024);

  constructor(private router: Router, private dialog: MatDialog,
    private route: ActivatedRoute,
    private mealFavouritesService: MealFavouritesService,
    private mealPlanService: MealPlanService,
    private mealService: MealService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private seoService: SeoService,
    public adobeDtbTracking: AdobeDtbTracking
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.isMobile = (event.target.innerWidth < 1024);
  }

  async ngOnInit() {
    scrollToTop();
    // this.getMeals();
    setTimeout(() => {

      this.adobeDtbTracking.pageLoad("discover meals page");
    }, 5000);
    this.watchParams();
    this.mealPlan = await this.mealPlanService.getMealPlan();
    await this.getFavouriteMeals();
    this.cdr.detectChanges();
  }

  watchParams() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribeAll)).subscribe((paramMap) => {
      const filter = paramMap.get('filter')
      if (filter) {
        // query params have id for filters
        // use the name of filter and grab the id by its name in filter.ts and use that to get meals
        if (filter == 'dinner') {
          this.filter = { 'q': 'dinner' }
        } else {
          this.filter = { 'p_tag_ids': FilterIdsByName[filter]};
        }
        this.pageTitle = RecipeInformationByFilterName[filter].title;
        this.pageDescription = RecipeInformationByFilterName[filter].description;
        this.setSeo(filter)
      } else {
        this.resetSeo()
      }

      this.getMeals(this.meals.length, this.pageSize, 'right', this.searchQuery);
    })
  }

  setSeo(filter: string) {
    this.seoService.generateTags({
      title: RecipeInformationByFilterName[filter].titleTag,
      description: RecipeInformationByFilterName[filter].seoDescription,
      slug: this.router.url
    })
  }
  resetSeo() {
    this.seoService.generateTags({
      title: $localize`Select Recipes | Meals That Matter`,
      description: 'The all-in-one meal preparation tool, where you can choose from a wide range of flavorful recipes to take your meal prep for the week to a whole new level!',
      slug: this.router.url
    })
  }

  ngAfterViewInit() {
    this.isReady = true;
    this.cdr.detectChanges();
  }

  getNextBatch() {
    this.getMeals(this.meals.length, this.pageSize, 'right', this.searchQuery)
  }

  getPreviousBatch() {
    this.leftPageStart = this.leftPageStart - this.pageSize;
    if (this.leftPageStart < 0) {
      this.leftPageStart = this.numOfResults + this.leftPageStart;
    }
    this.getMeals(this.leftPageStart, this.pageSize, 'left', this.searchQuery)
  }

  trackByIndex(i: number) {
    return i;
  }

  getMeals(pageStart: number = this.pageStart, pageSize: number = this.pageSize, direction: string = 'right', query?: string, options: any = this.filter) {
    //Show spinner while loadin
    if (this.loading) {
      // stop duplicate calls
      return;
    }
    this.loading = true;
    this.mealService.getMeals(pageStart, pageSize, query, options).pipe(takeUntil(this.unsubscribeAll)).subscribe(
      async (meals: Meals) => {
        if (meals) {
          if (this.searchQuery && meals.items.length > 0) {
            // if the user is searching, swap the first element with the middle one to have it in middle of screen (at least 2 elements)
            const temp = meals.items[0];
            let middleIndex = meals.items.length % 2 === 0 ? meals.items.length / 2 : (meals.items.length - 1) / 2

            meals.items[0] = meals.items[middleIndex];
            meals.items[middleIndex] = temp;

          }
          this.didYouMean = meals.didYouMean;
          this.pageStart = pageStart;
          this.numOfResults = meals.results;
          // Populate meals
          if (direction === 'right') {
            // coming from right
            this.meals = [...this.meals, ...meals.items.slice(0, pageSize + 1)];
          } else {
            // coming from left
            this.meals = [...meals.items.slice(0, pageSize + 1), ...this.meals];
          }
          //Set meal plan IDs
          this.setMealPlanIds();
          // }
        }
        this.loading = false;
        this.cdr.detectChanges();

      }, (err: string) => {
        this.loading = false;
        this.error = err;
      });

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

  noFilters() {
    return JSON.stringify(this.filter) === '{}';
  }

  onRightClicked() {
    this.adobeDtbTracking.anchorLink('Clicked on desktop slider right button to move carousel')
  }

  onLeftClicked() {
    this.adobeDtbTracking.anchorLink('Clicked on desktop slider left button to move carousel')
  }

  setMealPlanIds() {
    this.mealPlan.forEach((userMeal: any) => {
      this.mealPlanIds[userMeal.id] = true
    });
  }

  searchMeals(query: string = '') {
    //Capture Enter Submit Event
    if (typeof query !== 'string') return;

    this.resetAllGlobalValues();
    if (query != "") {
      // this.filter = {}
      this.searchQuery = query;
      this.adobeDtbTracking.searchQuery(query, this.pageSize);
    }
    this.getMeals(this.pageStart, this.pageSize, 'right', query);
    //Reset Search Query
    // this.searchQuery = "";
  }

  resetAllGlobalValues() {
    this.meals = [];
    this.pageStart = 0;
    this.pageSize = 5;
  }

  async renderFilterDialog() {
    this.adobeDtbTracking.anchorLink('FILTER');
    let activeFilterId;

    if (Object.values(this.filter).length > 0) {
      activeFilterId = Object.values(this.filter)[0];
      if (activeFilterId === 'dinner') {
        activeFilterId = FilterIdsByName['dinner']
      }
    }
    const filterDialog = this.dialog.open(FilterComponent, {
      data: {
        resetFilter: this.noFilters(),
        activeFilterId: activeFilterId
      }
    });
    filterDialog.afterClosed().pipe(takeUntil(this.unsubscribeAll)).subscribe((filter: IFilter) => {
      if (filter) {

        this.router.navigate([`/recipes/discover/${filter.key || ''}`], { queryParamsHandling: "preserve" });
        this.searchQuery = '';
        this.resetAllGlobalValues()
      }
    });

  }


  setSearchQuery() {
    this.searchQuery = this.didYouMean;
    this.didYouMean = null;
  }

  visitMealPlan() {
    this.router.navigate(['/recipes/my-meals'], { queryParamsHandling: "preserve" });
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

        (fromDialog.action === 'add') ? this.favouriteMealIds[fromDialog.meal.id] = true : delete this.favouriteMealIds[fromDialog.meal.id]

      }
    }
    ref.afterClosed().toPromise().then((newDialog: string) => {
      if (!newDialog) {
        // if no new dialog is openning
        this.router.navigate(['.'], { queryParamsHandling: "preserve", relativeTo: this.route  })
      }
    })

  }

  promptUserForAuth() {
    this.router.navigate(['/auth'], { queryParamsHandling: "preserve" });
  }

  async addToMealPlan(mealId: string) {
    // add to mealplan
    const meal = this.meals.find((meal) => meal.id === mealId);
    this.adobeDtbTracking.anchorLinkMeal('Adding to Meal Plan: ', meal.title);
    const status = await this.mealPlanService.saveMealPlan([...this.mealPlan, meal], mealId);
    if (status !== 'Successfully created') {
      if (status !== undefined) {
        // if the status is not undefined, that means there was an error sent back, otherwise a req to server may not have been made
        this.snackBar.open($localize`Error adding to meal plan`, null, { duration: 2000, verticalPosition: 'top' });
      }
      return;
    } else {
      this.mealPlanIds[mealId] = true;
      this.mealPlan.push(meal);
      this.snackBar.open($localize`Added to meal plan!`, null, { duration: 2000, verticalPosition: 'top' });
    }

    this.cdr.detectChanges();
  }

  async removeFromMealPlan(mealId: string) {
    // remove from mealplan
    const status = await this.mealPlanService.saveMealPlan(this.mealPlan, mealId, 'remove');

    if (status !== 'Successfully deleted') {
      if (status !== undefined) {
        // if the status is not undefined, that means there was an error sent back, otherwise a req to server may not have been made
        this.snackBar.open($localize`Error removing from meal plan`, null, { duration: 2000, verticalPosition: 'top' });
      }
      return;
    }
    this.mealPlan = this.mealPlan.filter((meal) => meal.id !== mealId)
    delete this.mealPlanIds[mealId];
    const meal = this.meals.find((meal) => meal.id === mealId);
    this.adobeDtbTracking.anchorLinkMeal('Removing from Meal Plan: ', meal.title);
    this.snackBar.open($localize`Removed from meal plan!`, null, { duration: 2000, verticalPosition: 'top' });
    this.cdr.detectChanges();
  }

  updateFavourites(favouriteMeal: any) {

    if (this.favouriteMeals.find((meal: any) => meal.id == favouriteMeal.id)) {
      this.removeFromFavourites(favouriteMeal);

    } else {
      this.addToFavourites(favouriteMeal);

    }

  }

  async removeFromFavourites(favouriteMeal: any) {
    const status = await this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id, 'remove');
    if (status !== 'Successfully deleted') {
      if (status !== undefined) {

        this.snackBar.open($localize`Error removing from favourites`, null, { duration: 2000, verticalPosition: 'top' });
      }
      return;
    }
    this.favouriteMeals = this.favouriteMeals.filter((meal: any) => meal.id !== favouriteMeal.id)
    delete this.favouriteMealIds[favouriteMeal.id];
    const meal = this.meals.find((meal) => meal.id === favouriteMeal.id);
    this.adobeDtbTracking.anchorLinkMeal('Removing from Favourites: ', meal.title);
    this.snackBar.open($localize`Removed from favourites!`, null, { duration: 2000, verticalPosition: 'top' });

    this.cdr.detectChanges();
  }

  async addToFavourites(favouriteMeal: any) {
    const status = await this.mealFavouritesService.saveMealFavourites([...this.favouriteMeals, favouriteMeal], favouriteMeal.id);
    if (status !== 'Successfully created') {
      if (status !== undefined) {

        this.snackBar.open($localize`Error adding to favourites`, null, { duration: 2000, verticalPosition: 'top' });
      }
      return;
    }
    this.favouriteMeals.push(favouriteMeal)
    this.favouriteMealIds[favouriteMeal.id] = true;
    const meal = this.meals.find((meal) => meal.id === favouriteMeal.id);
    this.adobeDtbTracking.anchorLinkMeal('Adding to Favourites: ', meal.title);
    this.snackBar.open($localize`Added to favourites!`, null, { duration: 2000, verticalPosition: 'top' });

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}



