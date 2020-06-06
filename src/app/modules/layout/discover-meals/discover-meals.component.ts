import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from '../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { scrollToTop, shuffleArray } from '../../../../app/utilities/helper-functions';
import { FilterComponent } from '../../../components/dialogs/filter/filter.component';
import { MealService } from '../../../services/meal/meal.service';
import { PreferencesService } from '../../../services/preferences/preferences.service';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';

@Component({
  selector: 'app-discover-meals',
  templateUrl: './discover-meals.component.html',
  styleUrls: ['./discover-meals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverMealsComponent implements OnInit, AfterViewInit, OnDestroy {

  meals: any[] = [];
  favouriteMeals: any = []
  preferences: string = '';
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
  mealPlan: any[] = [];


  constructor(private router: Router, private dialog: MatDialog,
    private route: ActivatedRoute,
    private mealFavouritesService: MealFavouritesService,
    private mealPlanService: MealPlanService,
    private mealService: MealService,
    private accountService: AccountService,
    private preferencesService: PreferencesService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public adobeDtbTracking: AdobeDtbTracking
  ) {
  }

  async ngOnInit() {
    scrollToTop();
    this.adobeDtbTracking.pageLoad("discover meals page");
    this.watchRouteForRecipePrompt()
    if (this.preferences.split(' ').length > 0) {//Randomize preferences if multiple preferences
      this.preferences = shuffleArray(this.preferences.split(' ')).join(' ');
    }
    this.getMeals();
    this.mealPlan = await this.mealPlanService.getMealPlan();

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

  async getPreferences() {
    return await this.preferencesService.getPreferences();
  }

  getMeals(pageStart: number = this.pageStart, pageSize: number = this.pageSize, query: string = this.preferences) {
    //Show spinner while loading
    this.loading = true;
    this.mealService.getMeals(pageStart, pageSize, query).pipe(takeUntil(this.unsubscribeAll)).subscribe(async (meals) => {
      if (meals) {
        //Check if did_you_mean
        if (meals.hasOwnProperty("did_you_mean") && meals.hasOwnProperty("did_you_mean_results") && meals.data.length === 0) {
          this.didYouMean = meals.did_you_mean;
          // if did you mean exists, still search for those results
          this.searchMeals(this.didYouMean);
        } else if (!meals.did_you_mean) {
          this.didYouMean = null;
        }
        //Reset page start
        this.pageStart = pageStart;
        //Map Results
        let theMeals = this.mapResults(meals);
        // Populate meals
        if (pageStart < meals.results) {
          if (this.meals && (this.meals.length === this.pageStart)) {//Avoid multiple push with same server response
            this.meals.push(...theMeals.slice(0, pageSize + 1)); // -1 for index, grabbing meals from api and appending it to meals
          }
        }
        //Disable Spinner
        //Enable next button
        //Set meal plan IDs
        this.setMealPlanIds()
        // get favourite meals
        this.getFavouriteMeals();
        //Add Query to preferences
        if (this.theEnteredSearchQuery && theMeals && theMeals.length > 0) {
          this.addToPreferences(this.theEnteredSearchQuery);
        }

      }
      this.loading = false;

    });
  }

  mapResults(meals: any) {//an interface  should be created for this
    if (meals.data) {
      return meals.data.map((meal: any, index: any) => ({
        id: meal.recipe_id,
        image: meal.assets.image.default[0].url,
        cuisine: meal.cuisines && (Object.keys(meal.cuisines).length === 0) ? null : meal.cuisines[0].description,
        title: meal.title,
        nutrition: meal.nutrients_legacy,
        cookTime: meal.cook_time,
        prepTime: meal.prep_time,
        servings: meal.yield.value + " " + meal.yield.measure,
        ingredients: meal.ingredients.ungrouped.list,
        instructions: meal.methods.ungrouped.list,
        mainIngredient: (Object.keys(meal.main_ingredient).length === 0) ? null : meal.main_ingredient[0].description
      }));
    }
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


  searchMeals(query?: any) {
    //Capture Enter Submit Event
    if (typeof query !== 'string') query = query.target.value;

    if (query == "") {//check if search field is cleared
      query = this.preferences;
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
    filterDialog.afterClosed().pipe(takeUntil(this.unsubscribeAll)).subscribe((filterName: string) => {
      this.searchMeals(filterName);
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

  async addToMealPlan(mealId: any) {
    // add to mealplan
    const meal = this.meals.find((meal) => meal.id === mealId);
    this.adobeDtbTracking.anchorLinkMeal('Adding to Meal Plan: ', meal.title);
    this.mealPlan.push(meal);
    this.mealPlanIds[mealId] = true;
    await this.mealPlanService.saveMealPlan(this.mealPlan, mealId);
    this.snackBar.open('Added to meal plan!', null, { duration: 2000 });

  }

  async removeFromMealPlan(mealId: any) {
    // add to mealplan
    await this.mealPlanService.saveMealPlan(this.mealPlan, mealId, 'remove');
    this.mealPlan = this.mealPlan.filter((meal) => meal.id !== mealId)
    delete this.mealPlanIds[mealId];
    const meal_delete_adobe = this.meals.find((meal) => meal.id === mealId);
    this.adobeDtbTracking.anchorLinkMeal('Removing from Meal Plan: ', meal_delete_adobe.title);
    this.snackBar.open('Removed from meal plan!', null, { duration: 2000 });
  }

  updateFavourites(favouriteMeal: any) {
    if (!this.accountService.loggedIn) {
      // this.promptUserForAuth()
    }
    if (this.favouriteMeals.find((meal: any) => meal.id == favouriteMeal.id)) {
      this.removeFromFavourites(favouriteMeal);
      this.snackBar.open('Removed from favourites!', null, { duration: 2000 });

    } else {
      this.addToFavourites(favouriteMeal);
      this.snackBar.open('Added to favourites!', null, { duration: 2000 });

    }

  }



  async removeFromFavourites(favouriteMeal: any) {
    await this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id, 'remove');
    this.favouriteMeals = this.favouriteMeals.filter((meal: any) => meal.id !== favouriteMeal.id)
    delete this.favouriteMealIds[favouriteMeal.id];
    const favourite_meal_adobe = this.meals.find((meal) => meal.id === favouriteMeal.id);
    this.adobeDtbTracking.anchorLinkMeal('Removing from Favourites: ', favourite_meal_adobe.title);
  }

  addToFavourites(favouriteMeal: any) {
    this.favouriteMeals.push(favouriteMeal)
    this.favouriteMealIds[favouriteMeal.id] = true;
    this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id);
    const favourite_meal_adobe = this.meals.find((meal) => meal.id === favouriteMeal.id);
    this.adobeDtbTracking.anchorLinkMeal('Adding to Favourites: ', favourite_meal_adobe.title);
  }

  loadMore() {
    // const startAt = this.meals.length + 1;
    // this.getMeals(this.pageStart, this.pageSize, this.preferences);
    const new_pageStart = this.meals.length;
    if (this.theEnteredSearchQuery) {
      this.getMeals(new_pageStart, this.pageSize, this.theEnteredSearchQuery);
    } else {
      this.getMeals(new_pageStart, this.pageSize, this.preferences);
    }
  }

  addToPreferences(q: String) {
    //Save Query terms as preferences
    let query_term_array = this.theEnteredSearchQuery.split(' ');
    query_term_array.forEach(term => {
      if (!this.preferences.includes(term.toLowerCase())) {
        this.preferences += ` ${term.trim()}`
        this.preferencesService.savePreferences(this.preferences.trim());
      }
    });
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
