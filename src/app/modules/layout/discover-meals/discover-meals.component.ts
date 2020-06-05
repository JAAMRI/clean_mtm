import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from '../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { PreferencesService } from '../../../../app/services/preferences/preferences.service';
import { SeoService } from '../../../../app/services/seo.service';
import { SPELLING_ERROR } from '../../../../app/utilities/global-constants';
import { scrollToTop } from '../../../../app/utilities/helper-functions';
import { UserFormComponent } from '../../../components/dialogs/user-form/user-form.component';
import { MealService } from '../../../services/meal/meal.service';
import { BREAKPOINTS } from '../../../utilities/breakpoints';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';
import { FilterComponent } from '../../../components/dialogs/filter/filter.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-discover-meals',
  templateUrl: './discover-meals.component.html',
  styleUrls: ['./discover-meals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverMealsComponent implements OnInit, AfterViewInit, OnDestroy {

  meals: any[] = [];
  userMealPlan$: Observable<any>;
  spellingError: boolean = SPELLING_ERROR;
  // currentMealPlan: any[] = [];
  favouriteMeals: any = []
  preferences: string = '';
  loading = false;
  viewLoaded: boolean = false;
  searchQuery: string;
  didYouMean: string;
  unsubscribeAll = new Subject();
  isMobile: boolean;
  isWeb: boolean;
  itemsDisplayed: number;
  requestAmount = 3; // number of meals to get at a time
  disableNextButton: boolean = false;
  carouselIsChanging: boolean = false;
  reachedEndOfResponse: boolean = false;
  currentSlide: number;
  favouriteMealIds: any = [];

  pageStart: number = 0;
  pageSize: number = 5;//If you change this value, please change it in the search function in the meal service as well
  theEnteredSearchQuery: string = "";
  totalResults: number = 0;
  mealPlanIds = {};
  mealPlan: any[] = [];
  requestedMeals = false;

  slideConfig: any = {
    "slidesToScroll": 1,
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    'infinite': false
  };

  constructor(private router: Router, private dialog: MatDialog,
    private route: ActivatedRoute,
    private mealFavouritesService: MealFavouritesService,
    private mealPlanService: MealPlanService,
    private preferencesService: PreferencesService,
    private mealService: MealService, private breakpointObserver: BreakpointObserver,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private seo: SeoService,
    private title: Title,
    private cdr: ChangeDetectorRef,
    public adobeDtbTracking: AdobeDtbTracking
  ) {
    this.observeBreakpoints()
  }

  async ngOnInit() {
    scrollToTop();
    setTimeout(() => {
      this.adobeDtbTracking.pageLoad("discover meals page");
    },
      5000);
    this.preferences = await this.getPreferences();
    this.watchRouteForRecipePrompt()
    if (this.preferences.split(' ').length > 0) {//Randomize preferences if multiple preferences
      this.preferences = this.shuffleArray(this.preferences.split(' ')).join(' ');
    }
    this.getMeals(this.pageStart, this.pageSize, this.preferences);
    this.mealPlan = await this.mealPlanService.getMealPlan();
    // this.numOfMealsSelected = this.mealPlan.length;
    // await this.getPreferences();
    // this.getMeals(this.pageStart);
    if (!this.accountService.loggedIn) {
      this.watchAuthState()
    }
    this.title.setTitle('Choose Your Weekly Meals | Meals That Matter'); //updating page title
    this.seo.generateTags({
      title: 'Choose Your Weekly Meals | Meals That Matter',
      description: 'Choose your meals for the week and take your meal prep to the next level. Select from a wide range of amazing recipes, curated by our Knorr Chefs.',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/recipes/discover'
    })
  }

  ngAfterViewInit() {
    this.viewLoaded = true;
    this.cdr.detectChanges();
  }

  watchAuthState() {
    this.accountService.authStateChanged.subscribe((event) => {
      this.ngOnInit()
    })
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

  getMeals(pageStart?: number, pageSize?: number, query = "") {
    //Show spinner while loading
    this.loading = true;
    this.mealService.getMeals(pageStart, pageSize, query).pipe(takeUntil(this.unsubscribeAll)).subscribe(async (meals) => {
      this.requestedMeals = true; // a flag to know whether meals were requested
      if (meals) {
        //Check if did_you_mean
        if (meals.hasOwnProperty("did_you_mean") && meals.hasOwnProperty("did_you_mean_results") && meals.data.length === 0) {
          this.didYouMean = meals.did_you_mean;
          // if did you mean exists, still search for those results
          this.searchMeals(this.didYouMean);
        } else if (!meals.did_you_mean){
          this.didYouMean = null;
        }
        //Reset page start
        this.pageStart = pageStart;
        //Set total number of results
        this.totalResults = meals.results;
        //Map Results
        let theMeals = this.mapResults(meals);
        // Populate meals
        if (pageStart < this.totalResults) {
          if (this.meals && (this.meals.length === this.pageStart)) {//Avoid multiple push with same server response
            this.meals.push(...theMeals.slice(0, pageSize + 1)); // -1 for index, grabbing meals from api and appending it to meals
          }
        }
        //Disable Spinner
        this.loading = false;
        //Enable next button
        this.disableNextButton = false;
        //Set meal plan IDs
        this.setMealPlanIds()
        // get favourite meals
        this.getFavouriteMeals();
        //Add Query to preferences
        if (this.theEnteredSearchQuery && theMeals && theMeals.length > 0) {
          this.addToPreferences(this.theEnteredSearchQuery);
        }

      }
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
    this.totalResults = 0;
    this.pageStart = 0;
    this.pageSize = 6;
  }

  renderFilterDialog() {
    const filterDialog = this.dialog.open(FilterComponent);

    filterDialog.afterClosed().subscribe((filterName: string) => {
      this.searchMeals(filterName)
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
    if (!this.carouselIsChanging) {
      // const mealTitle = meal.title as string;
      this.promptMealDetailComponent(meal.id);
      // this.router.navigate([`/recipes/discover/`], { queryParams: { recipe: mealTitle.split(',').join('').split(' ').join('-').split('&').join('and'), id: meal.id } })

    }
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
    this.snackBar.open('Added to meal plan!');

  }

  async removeFromMealPlan(mealId: any) {
    // add to mealplan
    await this.mealPlanService.saveMealPlan(this.mealPlan, mealId, 'remove');
    this.mealPlan = this.mealPlan.filter((meal) => meal.id !== mealId)
    delete this.mealPlanIds[mealId];
    const meal_delete_adobe = this.meals.find((meal) => meal.id === mealId);
    this.adobeDtbTracking.anchorLinkMeal('Removing from Meal Plan: ', meal_delete_adobe.title);
    this.snackBar.open('Removed from meal plan!');
  }

  updateFavourites(favouriteMeal: any) {
    if (!this.accountService.loggedIn) {
      // this.promptUserForAuth()
    }
    if (this.favouriteMeals.find((meal: any) => meal.id == favouriteMeal.id)) {
      this.removeFromFavourites(favouriteMeal);
    this.snackBar.open('Removed from favourites!');
      
    } else {
      this.addToFavourites(favouriteMeal);
    this.snackBar.open('Added to favourites!');

    }

    // this.favouriteMeals.includes(favouriteMeal) ? this.removeFromFavourites(favouriteMeal) : this.addToFavourites(favouriteMeal);
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


  // addFavouriteId_backup(favouriteMeal: any) {
  //   this.favouriteMeals.push(favouriteMeal)
  //   this.favouriteMealIds += (favouriteMeal.id + '|');
  // }

  checkCarouselItemsRemaining(carouselEvent: any) {
    this.currentSlide = carouselEvent.currentSlide; // initially this is equal to one. When user clicks next, this changes to 2
    if (this.currentSlide === (this.meals.length - this.itemsDisplayed)) {
      this.disableNextButton = true;
      if (this.meals.length < this.totalResults) {//Check if we reached the end
        if (this.currentSlide === (this.meals.length - this.itemsDisplayed)) {
          this.loadMore();
        }
      }
    } else {
      this.disableNextButton = false;
    }
    //Set carousel changing to false, important for the click to view the meal detail page 
    this.carouselIsChanging = false;
  }

  // Carousel functions
  checkCarouselItemsRemaining_backup(carouselEvent: any) {
    this.disableNextButton = false;
    const numOfCarouselItems = this.meals.length;
    this.currentSlide = carouselEvent.currentSlide; // initially this is equal to one. When user clicks next, this changes to 2
    if (this.currentSlide === (numOfCarouselItems - this.itemsDisplayed)) {
      this.loadMore();
    }
  }

  setCarouselChanging() {
    //carousel is being slided
    this.carouselIsChanging = true;
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

  //  setting breakpoint configs
  observeBreakpoints() {
    this.breakpointObserver.observe(BREAKPOINTS).pipe(takeUntil
      (this.unsubscribeAll)).subscribe((result: BreakpointState) => {
        const isHandsetPortrait = this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: portrait)');
        const isHandsetLandscape = this.breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)');
        this.isWeb = this.breakpointObserver.isMatched('(min-width: 960px)');
        this.isMobile = isHandsetPortrait || isHandsetLandscape;
        this.itemsDisplayed = (this.isWeb ? 4 : (isHandsetPortrait ? 1 : 2)); // number of items being displayed in carousel
        this.slideConfig = { ...this.slideConfig, 'slidesToShow': this.itemsDisplayed };
      });
  }

  // ON DESTROY
  completeSubscription() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngOnDestroy() {
    this.completeSubscription();
  }

  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  shuffleArray(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }


}
