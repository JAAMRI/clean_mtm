import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, Optional, ViewChild, ViewEncapsulation, LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AccountService } from '../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { SeoService } from '../../../../app/services/seo.service';
import { scrollToTop } from '../../../../app/utilities/helper-functions';
import { environment } from '../../../../environments/environment';
import { Meal, RelatedRecipe } from '../../../interfaces/meal/meal';
import { MealService } from '../../../services/meal/meal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeSeo } from '../../../utilities/recipes.seo';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MealDetailComponent implements OnInit, OnDestroy {
  mealId: string;
  loading: boolean;
  meal: Meal;
  favourited: boolean = false;
  unsubscribeAll = new Subject();
  inMealPlan: boolean;
  isMobile: boolean = window.innerWidth < 768;
  relatedRecipes: RelatedRecipe[];
  currentMealPlan: Meal[] = [];
  favouriteMeals = [];
  mealDetailWidget: string;
  favouriteMealIds = '';
  carouselIsChanging: boolean;
  emailContent: string;
  inDialog = false;
  mealPlanIds = {};
  script: HTMLScriptElement;

  public dialogParams: any;

  @ViewChild('recommendedMeals', { static: false }) recommendedMeals: ElementRef;
  @ViewChild('topOfPage', { static: false }) topOfPage: ElementRef;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private mealFavouritesService: MealFavouritesService,
    private mealPlanService: MealPlanService,
    private mealService: MealService,
    public adobeDtbTracking: AdobeDtbTracking,
    private seo: SeoService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) public locale: string
  ) {
  }
  
  get isLoggedIn(): boolean {
      return this.accountService.loggedIn;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.isMobile = (event.target.innerWidth < 768);
  }

  async ngOnInit() {
    scrollToTop();
    this.updateSeoTag()
    this.mealId = await this.getMealId();
    if (RecipeSeo[this.mealId]) {
      // if one of the recipes is part of the seo tags to add to the header
      this.addRecipeToHeader()
    }
    this.getMealById()

    if (!this.accountService.loggedIn) {
      this.watchAuthState()
    }
  }


  addRecipeToHeader() {
    this.script = document.createElement('script');
    // script type
    this.script.type = 'application/ld+json';
    //set text
    this.script.text = JSON.stringify(RecipeSeo[this.mealId]);

    //append to head
    document.getElementsByTagName('head')[0].appendChild(this.script);
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
        const mealId = paramArray[paramArray.length - 1];
        if (mealId) {
          return mealId;
        }
      }
      return ''
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
    let dialog;
    if (this.inDialog) {
      dialog = document.getElementsByClassName('recipe-dialog-container')[0];
      dialog.classList.add('unset-box-shadow');
    }
    this.loading = true;
    try {
      // this.buildRecipeWidget(); recipe widget
      this.meal = (await this.mealService.getMealById(this.mealId).toPromise());
      this.relatedRecipes = [...this.meal.relatedRecipes];
      this.loading = false;
      if (this.inDialog && dialog) {
        dialog.classList.remove('unset-box-shadow')
      }
      this.currentMealPlan = await this.mealPlanService.getMealPlan();
      this.currentMealPlan.filter((m) => m).forEach((meal) => {
        this.mealPlanIds[meal.id] = true;
      })
      this.getFavouriteMeals();
      this.checkIfMealInMealPlan();
      this.getEmailContent();
      this.logMealLocation()

    } catch (error) {

      this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" })

    }
  }

  checkAuth() {
    if (this.accountService.loggedIn) {
      this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" })
    } else {
      this.router.navigate(['/auth'], { queryParamsHandling: "preserve" })

    }
  }

  logMealLocation() {

    const host = this.locale === 'fr' ? environment.frenchBaseUrl : environment.englishBaseUrl;
    const mealTitle = this.meal.title.split(',').join('').split('(').join('').split(')').join('').split(' ').join('-').split('&').join('and');
    const location = `RECIPE LOCATION: ${host}/recipes/${mealTitle}-${this.mealId}`;
    console.log(location);
  }

  async getFavouriteMeals() {
    this.favouriteMeals = await this.mealFavouritesService.getMealFavourites();
    if (this.favouriteMeals && Array.isArray(this.favouriteMeals)) {
      this.favouriteMeals.map((meal) => meal.id).forEach((mealId) => {
        if (mealId === this.meal.id) {
          this.favourited = true;
        }
        this.favouriteMealIds += `${mealId}|`;
      })
    }
  }

  getEmailContent() {
    const host = this.locale === 'fr' ? environment.frenchBaseUrl : environment.englishBaseUrl;
    const mealTitle = this.meal.title.split(',').join('').split('(').join('').split(')').join('').split(' ').join('-').split('&').join('and');
    const location = `${host}/recipes/${mealTitle}-${this.mealId}`;
    const body = $localize`Hi, Thought you would love this recipe from Meals That Matter. ` + encodeURIComponent(location);
    this.emailContent = `mailto:?body=${body}&subject=${this.meal.title}`;
  }

  // buildRecipeWidget() {
  //   this.mealDetailWidget = `<div class="cc-recipe-details-container" recipe-id="{${this.mealId}}"></div>`
  // }

  visitMealDetailPage(meal: Meal) {
    if (this.inDialog) {
      this.mealId = meal.id;
      this.getMealById();
    } else {
      this.mealId = meal.id;
      this.router.navigate(['/recipes', meal.title.split(',').join('').split(' ').join('-').split('&').join('and') + '-' + meal.id], { queryParamsHandling: "preserve" });
      this.getMealById();
      this.scrollToTop()
    }

    // new dialog opening


  }

  checkIfMealInMealPlan() {
    this.inMealPlan = !!this.currentMealPlan.filter((m) => m).find((meal) => meal.id === this.mealId);
  }

  scrollToTop() {
    this.loading = true
    this.topOfPage.nativeElement.scrollIntoView();
    setTimeout(() => this.loading = false, 1);
    this.adobeDtbTracking.anchorLinkMeal('CTA LABEL, back to top on: ', this.meal.title);
  }

  scrollDown() {
    this.recommendedMeals.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.adobeDtbTracking.anchorLinkMeal('CTA LABEL, scroll down to bottom wrapper: ', this.meal.title);
  }

  promptUserForAuth() {
    this.router.navigate(['/auth'], { queryParamsHandling: "preserve" });
  }

  pushStart() {
    this.relatedRecipes = [...this.meal.relatedRecipes, ...this.relatedRecipes]
  }

  pushEnd() {
    this.relatedRecipes = [...this.relatedRecipes, ...this.meal.relatedRecipes]
  }

  async addToMealPlan(id?: string) {
    // add to mealplan
    let meal = this.meal;
    let mealId = id || this.meal.id;
    if (id) {
      meal = await this.mealService.getMealById(id).toPromise();
    }


    this.currentMealPlan.push(meal);
    this.mealPlanIds[mealId] = true;
    const status = await this.mealPlanService.saveMealPlan(this.currentMealPlan, mealId, 'add')
    if (status !== 'Successfully created') {
      this.dialogRef.close()
      this.snackBar.open($localize`Error adding to meal plan`, null, { duration: 1000, verticalPosition: 'top' });
      return;
    }
    if (this.inDialog) {
      this.dialogParams.onAddOrRemoveMealPlan({ 'meal': meal, 'action': 'add' });
    }
    this.adobeDtbTracking.anchorLinkMeal('Adding to Meal Plan: ', meal.title);
    this.snackBar.open($localize`Added to meal plan!`, null, { duration: 1000, verticalPosition: 'top' });

  }

  async removeFromMealPlan(id?: string) {
    // add to mealplan
    let meal = this.meal;
    let mealId = id || this.meal.id;
    if (id) {
      meal = await this.mealService.getMealById(id).toPromise();
    }
    const status = await this.mealPlanService.saveMealPlan(this.currentMealPlan, mealId, 'remove')
    if (status !== 'Successfully deleted') {
      this.dialogParams.close()
      this.snackBar.open($localize`Error removing from meal plan`, null, { duration: 1000, verticalPosition: 'top' });
      return;
    }
    this.currentMealPlan = this.currentMealPlan.filter((m) => m).filter((meal) => meal.id !== mealId)
    delete this.mealPlanIds[mealId];
    if (this.inDialog) {
      this.dialogParams.onAddOrRemoveMealPlan({ 'meal': meal, 'action': 'remove' });
    }
    this.adobeDtbTracking.anchorLinkMeal('Removing From Meal Plan: ', meal.title);
    this.snackBar.open($localize`Removed from meal plan!`, null, { duration: 1000, verticalPosition: 'top' });

  }

  async updateFavourites(favouriteMeal: any) {
    if (!this.accountService.loggedIn) {
      this.promptUserForAuth()
    }
    if (this.favouriteMeals.find((meal) => meal.id === favouriteMeal.id)) {
      const status = await this.mealFavouritesService.saveMealFavourites(this.favouriteMeals, favouriteMeal.id, 'remove')
      if (status !== 'Successfully deleted') {
        this.dialogRef.close()

        this.snackBar.open($localize`Error removing from favourites`, null, { duration: 1000, verticalPosition: 'top' });
        return;
      }
      if (this.inDialog) {

        this.dialogParams.onAddOrRemoveFavourites({ 'meal': favouriteMeal, 'action': 'remove' });
      }
      this.removeFavourite(favouriteMeal);

    } else {
      const status = await this.mealFavouritesService.saveMealFavourites([...this.favouriteMeals, favouriteMeal], favouriteMeal.id);
      if (status !== 'Successfully created') {
        this.dialogRef.close()

        this.snackBar.open($localize`Error adding to favourites`, null, { duration: 1000, verticalPosition: 'top' });
        return;
      }
      this.addFavourite(favouriteMeal)
      if (this.inDialog) {
        this.dialogParams.onAddOrRemoveFavourites({ 'meal': favouriteMeal, 'action': 'add' });
      }
    }
  }

  removeFavourite(favouriteMeal: any) {
    this.favouriteMealIds = this.favouriteMealIds.replace(favouriteMeal.id + '|', '');
    this.favouriteMeals = this.favouriteMeals.filter((m) => m.id !== favouriteMeal.id)
    this.adobeDtbTracking.anchorLinkMeal('Removing from Favourite: ', this.meal.title);
    if (favouriteMeal.id === this.meal.id) {
      this.favourited = false;
    }
    this.snackBar.open($localize`Removed from favourites!`, null, { duration: 2000, verticalPosition: 'top' });

  }

  addFavourite(favouriteMeal: any) {
    this.favouriteMeals.push(favouriteMeal)
    this.favouriteMealIds += (favouriteMeal.id + '|');
    if (favouriteMeal.id === this.meal.id) {
      this.favourited = true;
    }
    this.adobeDtbTracking.anchorLinkMeal('Adding to Favourite: ', this.meal.title);
    this.snackBar.open($localize`Added to favourites!`, null, { duration: 2000, verticalPosition: 'top' });

  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.seo.removeTag();

    // remove script from head
    if (this.script) {
      this.script.parentNode.removeChild(this.script);
    }
  }

}
