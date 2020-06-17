import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AccountService } from '../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { SeoService } from '../../../../app/services/seo.service';
import { scrollToTop } from '../../../../app/utilities/helper-functions';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class MyMealsComponent implements OnInit, OnDestroy {
  mealPlan = [];
  unsubscribeAll = new Subject();

  favouriteMeals = [];
  favouriteMealIds: string = '';

  constructor(private router: Router, private snackbar: MatSnackBar,
    private mealPlanService: MealPlanService,
    private mealFavouritesService: MealFavouritesService,
    private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,
    public accountService: AccountService,
    private dialog: MatDialog,
    private seo: SeoService,
    private title: Title,
    public adobeDtbTracking: AdobeDtbTracking) {
    this.registerIcons();

  }

  ngOnInit() {
    scrollToTop();
    this.getMealPlan();
    setTimeout(() => {
      this.adobeDtbTracking.pageLoad("meal plan page");
    },
      5000);

    this.getFavouriteMeals();
    if (!this.accountService.loggedIn) {
      this.watchAuthState()
    }
    this.title.setTitle('MealsThatMatter – My Meal Plan'); //updating page title
    this.seo.generateTags({
      title: 'MealsThatMatter – My Meal Plan',
      description: 'View my meal plan',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/recipes/my-meals'
    })
  }

  watchAuthState() {
    this.accountService.authStateChanged.subscribe((event) => {
      this.ngOnInit()
    })
  }

  registerIcons() {
    // register mtm icons to use for meal plan
    this.matIconRegistry.addSvgIcon('mtmbread',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/static_images/my-meals-icons/carbs.svg'));
    this.matIconRegistry.addSvgIcon('mtmblob',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/static_images/my-meals-icons/fats.svg'));
    this.matIconRegistry.addSvgIcon('mtmfire',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/static_images/my-meals-icons/calories.svg'));
  }

  async getMealPlan() {
    this.mealPlan = await this.mealPlanService.getMealPlan();
  }

  async getFavouriteMeals() {
    this.favouriteMeals = await this.mealFavouritesService.getMealFavourites();
    if (this.favouriteMeals && Array.isArray(this.favouriteMeals)) {
      this.favouriteMeals.map((meal) => meal.id).forEach((mealId) => {
        this.favouriteMealIds += `${mealId}|`;
      })
    }
  }

  async addToMealPlan(meal: any) {
    // add to mealplan
    this.mealPlan.push(meal);
    await this.mealPlanService.saveMealPlan(this.mealPlan, meal.id);
  }

  async removeFromMealPlan(mealId: any) {
    await this.mealPlanService.saveMealPlan(this.mealPlan, mealId, 'remove');
    this.mealPlan = this.mealPlan.filter((meal) => meal.id !== mealId)
  }

  async updateFavourites(favouriteMeal: any) {
    if (this.favouriteMeals.find((meal) => meal.id === favouriteMeal.id)) {
      await this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id, 'remove')
      this.removeFavourite(favouriteMeal.id);
    } else {
      this.addFavourite(favouriteMeal)
      this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id)
    }
  }


  removeFavourite(mealId: string) {
    this.favouriteMeals = this.favouriteMeals.filter((meal: any) => meal.id !== mealId)
    this.favouriteMealIds = this.favouriteMealIds.replace(mealId + '|', '');

  }

  addFavourite(favouriteMeal: any) {
    this.favouriteMeals.push(favouriteMeal)
    this.favouriteMealIds += (favouriteMeal.id + '|');

  }

  visitMealDetailPage(meal: any) {

      this.promptMealDetailComponent(meal.id)
    
  }
  promptMealDetailComponent(id: string) {
    // if carousel is not being slided
    // this.router.navigate([`/recipes/${id}`]);
    const ref = this.dialog.open(MealDetailComponent, {
      panelClass: 'recipe-dialog-container',
      backdropClass: 'faded-backdrop',
      data: { id },
    });
    ref.componentInstance.dialogParams = {
      onAddOrRemoveMealPlan: (fromDialog: any) => {
        // console.log(fromDialog);
        //this will update added to meal plan in parent component
        (fromDialog.action === 'add') ? this.mealPlan.push(fromDialog.meal) : this.mealPlan = this.mealPlan.filter((meal) => meal.id !== fromDialog.meal.id);

        // (fromDialog.action === 'add') ? this.addToMealPlan(fromDialog.meal) : this.removeFromMealPlan(fromDialog.meal.id);
      },
      onAddOrRemoveFavourites: (fromDialog: any) => {//Action coming from dialog
        //this will update added to update in parent component
        (fromDialog.action === 'add') ? this.addFavourite(fromDialog.meal.id) : this.removeFavourite(fromDialog.meal.id)

      }
    }
    ref.afterClosed().toPromise().then((newDialog: string) => {
      if (!newDialog) {

        this.router.navigate(['/recipes/my-meals'], { queryParams: {} })
      }
    })

  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    // if (!this.isMobile) {
    //   hideWidget();
    // }
  }

  viewFavourites() {
    this.router.navigate(['/recipes/favourites']);
    this.adobeDtbTracking.pageTracking('FAVOURITES', '/mtmfavourites');
  }

}
