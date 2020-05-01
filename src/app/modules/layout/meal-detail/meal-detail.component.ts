import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { UserFormComponent } from '../../../../app/components/dialogs/user-form/user-form.component';
import { AccountService } from '../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { MealService } from '../../../../app/services/meal.service';
import { SeoService } from '../../../../app/services/seo.service';
import { BREAKPOINTS } from '../../../../app/utilities/breakpoints';
import { scrollToTop } from '../../../../app/utilities/helper-functions';
import { MockCarousel } from '../../../../app/utilities/mock-carousel';
import { environment } from '../../../../environments/environment';
// smoothscroll.polyfill();
@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MealDetailComponent implements OnInit, OnDestroy {
  mealId: string;
  loading: boolean;
  meal: any;
  unsubscribeAll = new Subject();
  inMealPlan: boolean;
  isMobile: boolean;
  isWeb: boolean;
  currentMealPlan: any = [];
  favouriteMeals = [];
  mealDetailWidget: string;
  favouriteMealIds = '';
  carouselIsChanging: boolean;
  emailContent: string;
  inDialog = false;
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "infinite": true
  };
  public dialogParams: any;

  carouselData = MockCarousel; //Mock data from utilities
  @ViewChild('recommendedMeals', { static: false }) recommendedMeals: ElementRef;
  @ViewChild('topOfPage', { static: false }) topOfPage: ElementRef;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<MealDetailComponent>,
    private accountService: AccountService,
    private mealFavouritesService: MealFavouritesService,
    private mealPlanService: MealPlanService,
    private mealService: MealService,
    public adobeDtbTracking: AdobeDtbTracking,
    private seo: SeoService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private breakpointObserver: BreakpointObserver
  ) {
    this.observeBreakpoints();
  }

  async ngOnInit() {
    console.log('on iinit')
    scrollToTop();
    this.updateSeoTag()
    this.mealId = await this.getMealId();
    this.getMealById()

    if (!this.accountService.loggedIn) {
      this.watchAuthState()
    }
  }

  async getMealId(): Promise<string> {
    // this function is used to determine if this component is rendered in a dialog or a landing page.
    // need to get mealId based on this
    if (this.data && this.data.id) {
      // coming from dialog
      this.inDialog = true;
      return this.data.id
    } else {
      const routeParams = await this.route.paramMap.pipe(first()).toPromise();
      const param = routeParams.get('id');

      if (param) {
     
        const paramArray = param.split('-');
        const mealId = paramArray[paramArray.length -1];
        if (mealId) {
          return mealId;
        }
      }
    }
  }

  updateSeoTag(): void {
    this.seo.updateTag({ rel: 'canonical', href: 'https://www.mealsthatmatter.com' + this.router.url });
  }

  watchAuthState() {
    this.accountService.authStateChanged.subscribe((event) => {
      this.ngOnInit()
    })
  }

  async getMealById() {
    this.loading = true;
    try {
      // this.buildRecipeWidget(); recipe widget
      this.meal = await this.mealService.getMealById(this.mealId).toPromise();
      this.loading = false;
      this.currentMealPlan = await this.mealPlanService.getMealPlan();
      this.getFavouriteMeals();
      this.checkIfMealInMealPlan();
      this.getEmailContent();
      this.logMealLocation()
      
    } catch (error) {
 
      this.router.navigate(['/recipes/discover'])

    }
  }

  logMealLocation() {
    const host = `${environment.production ? 'https://www.mealsthatmatter.com' : (environment.uat ? 'https://uat.mealsthatmatter.com' : 'http://localhost:4200')}`;
    const mealTitle = this.meal.title.split(',').join('').split('(').join('').split(')').join('').split(' ').join('-').split('&').join('and');
    const location = `RECIPE LOCATION: ${host}/recipes/${mealTitle}-${this.mealId}`;
    console.log(location);
  }

  async getFavouriteMeals() {
    this.favouriteMeals = await this.mealFavouritesService.getMealFavourites();
    if (this.favouriteMeals && Array.isArray(this.favouriteMeals)) {
      this.favouriteMeals.map((meal) => meal.id).forEach((mealId) => {
        this.favouriteMealIds += `${mealId}|`;
      })
    }
  }

  getEmailContent() {
    const host = `${environment.production ? 'https://www.mealsthatmatter.com' : (environment.uat ? 'https://uat.mealsthatmatter.com' : 'http://localhost:4200')}`;
    const mealTitle = this.meal.title.split(',').join('').split('(').join('').split(')').join('').split(' ').join('-').split('&').join('and');
    const location = `${host}/recipes/${mealTitle}-${this.mealId}`;
    const body = "Hi, Thought you would love this recipe from Meals That Matter. " + encodeURIComponent(location);
    this.emailContent = `mailto:?body=${body}&subject=${this.meal.title}`;
  }

  // buildRecipeWidget() {
  //   this.mealDetailWidget = `<div class="cc-recipe-details-container" recipe-id="{${this.mealId}}"></div>`
  // }

  visitMealDetailPage(meal: any) {
    if (!this.carouselIsChanging) {
      if (this.inDialog) {
        this.mealId = meal.id;
        this.getMealById();
      } else {
        this.mealId = meal.id;
        this.router.navigate(['/recipes', meal.title.split(',').join('').split(' ').join('-').split('&').join('and') + '-' + meal.id]);
        this.getMealById();
        this.scrollToTop()
      }

      // new dialog opening

    }
    this.carouselIsChanging = false;
  }

  checkIfMealInMealPlan() {
    this.inMealPlan = this.currentMealPlan.filter((m) => m).find((meal) => meal.id === parseInt(this.mealId, 10));
  }

  setCarouselChanging(event) {
    //carousel is being slided
    this.carouselIsChanging = true;
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.seo.removeTag();
  }

  scrollToTop() {
    this.loading = true
    this.topOfPage.nativeElement.scrollIntoView();
    setTimeout(() => this.loading = false, 1);
    this.adobeDtbTracking.anchor_link_meal('CTA LABEL, back to top on: ', this.meal.title);
  }

  scrollDown() {
    this.recommendedMeals.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.adobeDtbTracking.anchor_link_meal('CTA LABEL, scroll down to bottom wrapper: ', this.meal.title);
  }

  promptUserForAuth() {
    this.dialog.open(UserFormComponent, {
      panelClass: 'email-dialog-container',
      backdropClass: 'faded-backdrop',
      data: { isMobile: !this.isWeb }
    });
  }

  async addToMealPlan() {
    // add to mealplan
    this.currentMealPlan.push(this.meal);
    this.inMealPlan = true;
    await this.mealPlanService.saveMealPlan(this.currentMealPlan, this.meal.id, 'add')
    this.dialogParams.onAddOrRemoveMealPlan({ 'meal': this.meal, 'action': 'add' });
    this.adobeDtbTracking.anchor_link_meal('Adding to Meal Plan: ', this.meal.title);
  }

  async removeFromMealPlan() {
    // add to mealplan
    await this.mealPlanService.saveMealPlan(this.currentMealPlan, this.meal.id, 'remove')
    this.currentMealPlan = this.currentMealPlan.filter((m) => m).filter((meal) => meal.id !== this.meal.id)
    this.inMealPlan = false;
    this.dialogParams.onAddOrRemoveMealPlan({ 'meal': this.meal, 'action': 'remove' });
    this.adobeDtbTracking.anchor_link_meal('Removing From Meal Plan: ', this.meal.title);
  }

  async updateFavourites(favouriteMeal: any) {
    if (!this.accountService.loggedIn) {
      this.promptUserForAuth()
    }
    if (this.favouriteMeals.find((meal) => meal.id === favouriteMeal.id)) {
      await this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id, 'remove')
      this.dialogParams.onAddOrRemoveFavourites({ 'meal': favouriteMeal, 'action': 'remove' });
      this.removeFavourite(favouriteMeal);

    } else {
      this.addFavourite(favouriteMeal)
      this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id)
      this.dialogParams.onAddOrRemoveFavourites({ 'meal': favouriteMeal, 'action': 'add' });
    }
  }

  removeFavourite(favouriteMeal: any) {
    this.favouriteMealIds = this.favouriteMealIds.replace(favouriteMeal.id + '|', '');
    this.adobeDtbTracking.anchor_link_meal('Removing from Favourite: ', this.meal.title);
  }

  addFavourite(favouriteMeal: any) {
    this.favouriteMeals.push(favouriteMeal)
    this.favouriteMealIds += (favouriteMeal.id + '|');
    this.adobeDtbTracking.anchor_link_meal('Adding to Favourite: ', this.meal.title);
  }

  observeBreakpoints() {
    this.breakpointObserver.observe(BREAKPOINTS).pipe(takeUntil
      (this.unsubscribeAll)).subscribe((result: BreakpointState) => {
        this.isMobile = this.breakpointObserver.isMatched('(max-width: 599px)');
        this.isWeb = this.breakpointObserver.isMatched('(min-width: 960px)');
        this.slideConfig = { ...this.slideConfig, 'slidesToShow': this.isWeb ? 3 : (this.isMobile ? 1 : 2) };
      });
  }
}
