import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AccountService } from '../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { SeoService } from '../../../../app/services/seo.service';
import { scrollToTop } from '../../../../app/utilities/helper-functions';
import { MealService } from '../../../services/meal/meal.service';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  unsubscribeAll = new Subject();
  isMobile: boolean = window.innerWidth < 768;
  loading: boolean = false;
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


  constructor(private snackbar: MatSnackBar,

    private mealFavouritesService: MealFavouritesService,
    private mealPlanService: MealPlanService,
    private mealService: MealService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private router: Router,
    private seo: SeoService,
    private title: Title,
    public adobeDtbTracking: AdobeDtbTracking) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.isMobile = (event.target.innerWidth < 1024);
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
    this.title.setTitle('Favourite Recipes & Dishes | Meals That Matter'); //updating page title
    this.seo.generateTags({
      title: 'Favourite Recipes & Dishes | Meals That Matter',
      description: 'View your favourite recipes and dishes as selected by yourself here.',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/recipes/favourites'
    })
  }

  selectRecipes() {
    this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" });
    this.adobeDtbTracking.pageTracking('SELECT RECIPES', '/recipes/discover');
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
    this.loading = true;
    // get meal plan, filter out all nulls is there are any and add mealplan ids to string
    this.mealPlan = await this.mealPlanService.getMealPlan();
    this.mealPlan.filter((m) => m).forEach((meal) => {
      this.mealPlanIds[meal.id] = true;
    })
    this.loading = false;

  }

  async addToMealPlan(mealId: string) {
    // add to mealplan
    const meal = await this.mealService.getMealById(mealId).toPromise();
    const status = await this.mealPlanService.saveMealPlan([...this.mealPlan, meal], meal.id, 'add');
    if (status !== 'Successfully created') {
      this.snackbar.open('Error adding to meal plan.', null, { duration: 2000, verticalPosition: 'top' });
      return;
    }
    this.mealPlan.push(meal);
    this.mealPlanIds[mealId] = true;
    this.snackbar.open($localize`Added to meal plan!`, null, { duration: 2000, verticalPosition: 'top' });

  }

  async removeFromMealPlan(mealId: any) {
    // add to mealplan
    const status = await this.mealPlanService.saveMealPlan(this.mealPlan, mealId, 'remove')
    if (status !== 'Successfully deleted') {
      this.snackbar.open($localize`Error removing from meal plan`, null, { duration: 2000, verticalPosition: 'top' });
      return;
    }
    this.mealPlan = this.mealPlan.filter((meal) => meal.id !== mealId)
    delete this.mealPlanIds[mealId];
    this.snackbar.open($localize`Removed from meal plan!`, null, { duration: 2000, verticalPosition: 'top' });

  }

  async updateFavourites(favouriteMeal: any) {
    if (this.favouriteMeals.find((meal) => meal.id === favouriteMeal.id)) {
      const status = await this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id, 'remove')
      if (status !== 'Successfully deleted') {
        this.snackbar.open('Error removing from favourites.', null, { duration: 2000, verticalPosition: 'top' });
        return;
      }
      this.favouriteMeals = this.favouriteMeals.filter((meal) => meal.id !== favouriteMeal.id)
      this.snackbar.open($localize`Removed!`, null, { duration: 2000, verticalPosition: 'top' });

    } else {
      const status = await this.mealFavouritesService.saveMealFavourites([...this.favouriteMeals, favouriteMeal], favouriteMeal.id);
      if (status !== 'Successfully created') {
        this.snackbar.open('Error adding to favourites', null, { duration: 2000, verticalPosition: 'top' });
        return;
      }
      this.addFavourite(favouriteMeal)
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

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
