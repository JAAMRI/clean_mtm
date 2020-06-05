import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserFormComponent } from '../../../../app/components/dialogs/user-form/user-form.component';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { BREAKPOINTS } from '../../../../app/utilities/breakpoints';
import { scrollToTop } from '../../../../app/utilities/helper-functions';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';
import { Location } from '@angular/common';
import { AccountService } from '../../../../app/services/account/account.service';
import { SeoService } from '../../../../app/services/seo.service';
import { Title } from '@angular/platform-browser';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealService } from '../../../services/meal/meal.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  unsubscribeAll = new Subject();
  isMobile: boolean;
  isWeb: boolean;
  disableNextButton: boolean;
  favouriteMeals = [];
  slidesToShow: number;
  mealPlan = [];
  mealPlanIds = {};
  carouselIsChanging: boolean;

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    'infinite': false,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
  };


  constructor(private router: Router, private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private mealFavouritesService: MealFavouritesService,
    private mealPlanService: MealPlanService,
    private mealService: MealService,
    private location: Location,
    private accountService: AccountService,
    private dialog: MatDialog,
    private seo: SeoService,
    private title: Title,
    public adobeDtbTracking: AdobeDtbTracking) {
    this.observeBreakpoints();
  }

  ngOnInit() {
    setTimeout(() => {
      this.adobeDtbTracking.pageLoad("favourite meals page");
    },
      5000);
    this.getFavouriteMeals();
    this.getMealPlan();
    scrollToTop();
    if (!this.accountService.loggedIn) {
      this.watchAuthState()
    }
    this.title.setTitle('Favorite Recipes & Dishes | Meals That Matter'); //updating page title
    this.seo.generateTags({
      title: 'Favorite Recipes & Dishes | Meals That Matter',
      description: 'View your favorite recipes and dishes as selected by yourself here.',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/recipes/favourites'
    })
  }

  watchAuthState() {
    this.accountService.authStateChanged.subscribe((event) => {
      this.ngOnInit()
    })
  }

  async getFavouriteMeals() {
    this.favouriteMeals = await this.mealFavouritesService.getMealFavourites();
  }

  async getMealPlan() {
    // get meal plan, filter out all nulls is there are any and add mealplan ids to string
    this.mealPlan = await this.mealPlanService.getMealPlan();
    this.mealPlan.filter((m) => m).forEach((meal) => {
      this.mealPlanIds[meal.id] = true;
    })
  }

  async addToMealPlan(mealId: string) {
    // add to mealplan
    const meal = await this.mealService.getMealById(mealId).toPromise();

    this.mealPlan.push(meal);
    this.mealPlanIds[mealId] = true;
    await this.mealPlanService.saveMealPlan(this.mealPlan, meal.id, 'add');
    console.log(this.mealPlanIds);
    this.snackbar.open('Added to meal plan!', null, {duration: 2000});

  }

  async removeFromMealPlan(mealId: any) {
    // add to mealplan
    await this.mealPlanService.saveMealPlan(this.mealPlan, mealId, 'remove')
    this.mealPlan = this.mealPlan.filter((meal) => meal.id !== mealId)
    delete this.mealPlanIds[mealId];
    this.snackbar.open('Remove from meal plan!', null, {duration: 2000});

  }

  async updateFavourites(favouriteMeal: any) {
    if (this.favouriteMeals.find((meal) => meal.id === favouriteMeal.id)) {
      await this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id, 'remove')
      this.favouriteMeals = this.favouriteMeals.filter((meal) => meal.id !== favouriteMeal.id)
    this.snackbar.open('Removed!', null, {duration: 2000});

    } else {
      this.addFavourite(favouriteMeal)
      this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id);
    }
  }


  addFavourite(favouriteMeal: any) {
    this.favouriteMeals.push(favouriteMeal)
  }


  visitMealDetailPage(meal: any) {
    if (!this.carouselIsChanging) {
      // const mealTitle = meal.title as string;
      // this.router.navigate([`/recipes/favourites/`], { queryParams: { recipe: mealTitle.split(',').join('').split(' ').join('-').split('&').join('and'), id: meal.id } })
      this.promptMealDetailComponent(meal.id);
    }

  }
  promptMealDetailComponent(id: string) {
    const ref = this.dialog.open(MealDetailComponent, {
      panelClass: 'recipe-dialog-container',
      backdropClass: 'faded-backdrop',
      data: { id }
    });
    ref.componentInstance.dialogParams = {
      onAddOrRemoveMealPlan: (fromDialog: any) => {//Action coming from dialog
        //this will update added to meal plan in parent component
        (fromDialog.action === 'add') ? this.mealPlanIds[fromDialog.meal.id] = true : delete this.mealPlanIds[fromDialog.meal.id];
      },
      onAddOrRemoveFavourites: (fromDialog: any) => {//Action coming from dialog
        //this will update added to update in parent component
        (fromDialog.action === 'add') ? this.favouriteMeals.push(fromDialog.meal) : this.favouriteMeals = this.favouriteMeals.filter((meal) => meal.id !== fromDialog.meal.id);

      }
    }
 
  }


  // breakpoints
  //  setting breakpoint configs
  observeBreakpoints() {
    this.breakpointObserver.observe(BREAKPOINTS).pipe(takeUntil
      (this.unsubscribeAll)).subscribe((result: BreakpointState) => {
        this.isMobile = this.breakpointObserver.isMatched('(max-width: 599px)');
        this.isWeb = this.breakpointObserver.isMatched('(min-width: 960px)');
        this.slidesToShow = this.isWeb ? 3 : (this.isMobile ? 1 : 2)
        this.slideConfig = { ...this.slideConfig, 'slidesToShow': this.slidesToShow };
      });
  }
  setCarouselChanging(event) {
    //carousel is being slided
    this.carouselIsChanging = true;
    const { nextSlide } = event;
    if ((nextSlide + this.slidesToShow) === this.mealPlan.length) {
      this.disableNextButton = true;
    } else {
      this.disableNextButton = false;
    }
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
