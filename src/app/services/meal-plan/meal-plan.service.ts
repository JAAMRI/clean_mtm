import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { handleError } from '../../../app/utilities/helper-functions';
import { AccountService } from '../account/account.service';
import Auth from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  apiHost = environment.host;
  private mealPlanUrl = '/mealplans';  // URL to web api

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  saveMealPlan(mealPlan: any[], mealId?: string, action: string = 'add'): Promise<any> {
    if (!this.accountService.loggedIn) {
      const currentRoute = this.router.url;
      this.router.navigate(['/auth/login'], {
        queryParams: {
          returnUrl: currentRoute
        },
      })
      return;
    }
    return this.accountService.loggedIn ? this.saveMealPlanToServer(mealPlan, mealId, action) : this.saveMealPlanToLocalStorage(mealPlan, mealId, action);

  }
  //Save to server based on action (add | remove)
  async saveMealPlanToServer(mealPlan: any[], recipeId: string, action: string): Promise<any> {
    const recipe = mealPlan.find(recipe => recipe.id == recipeId);
    const payload = {
      "recipe_id": recipe.id,
      "recipe_title": recipe.title,
      "recipe_image_path": recipe.image
    }
    console.log(recipe.cookTime);
    //These values could be null
    payload['recipe_nutrition'] = (recipe.hasOwnProperty('nutrition')) ? recipe.nutrition : null;
    payload['recipe_main_ingredient'] = (recipe.hasOwnProperty('mainIngredient')) ? recipe.mainIngredient : null;
    payload['recipe_cook_time'] = (recipe.cookTime) ? recipe.cookTime : 0;
    payload['recipe_prep_time'] = (recipe.hasOwnProperty('prepTime')) ? recipe.prepTime : null;
    payload['recipe_servings'] = (recipe.hasOwnProperty('servings')) ? recipe.servings : null;

    return await Auth.currentSession().then(res => {
      let accessToken = res.getIdToken().getJwtToken()
      const headers = {
        headers: new HttpHeaders().set('Authorization', accessToken)
          .set('Content-Type', 'application/json')
      }
      if (action === 'add') {
        try {
          return this.http.post(this.apiHost + this.mealPlanUrl, payload, headers).toPromise()
        } catch(error) {
          console.error(error)
        }
        
      }
      if (action === 'remove') {
        return this.http.delete(this.apiHost + this.mealPlanUrl + `/${recipeId}`, headers).pipe(catchError(handleError('saveMealPlan', []))).toPromise();
      }
    }).catch(err => {
      alert('We could not save your meal plan, please try again later');
      console.log(err)
    })

    //Save to server based on action (add | remove)
    // async saveMealPlanToServer_BACKUP(mealPlan: any[], recipeId: string, action: string): Promise<any> {
    //   const recipe = mealPlan.find(recipe => recipe.id == recipeId);
    //   const payload = {
    //     "recipe_id": recipe.id,
    //     "recipe_title": recipe.title,
    //     "recipe_image_path": recipe.image
    //   }
    //   //These values could be null
    //   payload['recipe_nutrition'] = (recipe.hasOwnProperty('nutrition')) ? recipe.nutrition : null;
    //   payload['recipe_main_ingredient'] = (recipe.hasOwnProperty('mainIngredient')) ? recipe.mainIngredient : null;
    //   payload['recipe_cook_time'] = (recipe.hasOwnProperty('cookTime')) ? recipe.cookTime : null;
    //   payload['recipe_prep_time'] = (recipe.hasOwnProperty('prepTime')) ? recipe.prepTime : null;
    //   payload['recipe_servings'] = (recipe.hasOwnProperty('servings')) ? recipe.servings : null;

    //   return await Auth.currentSession().then(res => {
    //     let accessToken = res.getIdToken().getJwtToken()
    //     const headers = {
    //       headers: new HttpHeaders().set('Authorization', accessToken)
    //         .set('Content-Type', 'application/json')
    //     }
    //     if (action === 'add') {
    //       return this.http.post(this.apiHost + this.mealPlanUrl, payload, headers).pipe(catchError(handleError('saveMealPlan', []))).toPromise();
    //     } 
    //     if (action === 'remove') {
    //       return this.http.delete(this.apiHost + this.mealPlanUrl + `/${recipeId}`, headers).pipe(catchError(handleError('saveMealPlan', []))).toPromise();
    //     }
    //   }).catch(err => {
    //     alert('We could not save your meal plan, please try again later');
    //     console.log(err)
    //   })



    // just send one meal with image, id, and title
    // const meal = mealPlan.find((meal) => meal.id === mealId).map((meal) => ({id: meal.id, title: meal.title, image: meal.image}));
    // return this.http.put(this.apiHost + this.mealPlanUrl, meal).pipe(catchError(handleError('saveMealPlan', []))).toPromise();
  }

  async saveMealPlanToLocalStorage(mealPlan: any[], mealId: string, action: string): Promise<any> {
    // localstorage
    // check if the action is removed, then save the mealplan without that specific meal  in local storage... otherwise save the current meal plan that has the added  meal
    const stringifiedMealPlan = action === 'remove' ? JSON.stringify(mealPlan.filter((meal) => meal.id !== mealId)) : JSON.stringify(mealPlan)
    return Promise.resolve().then(function () {
      localStorage.setItem('mealPlan', stringifiedMealPlan);
    });
  }

  getMealPlan(): Promise<any> {
    return this.accountService.loggedIn ? this.getMealPlanFromServer() : this.getMealPlanFromLocalStorage();
  }

  async getMealPlanFromServer(): Promise<any> {
    // backend

    return await Auth.currentSession().then(res => {
      let accessToken = res.getIdToken().getJwtToken()
      const options = {
        headers: new HttpHeaders().set('Authorization', accessToken)
          .set('Content-Type', 'application/json')
      }
      return this.http.get(this.apiHost + this.mealPlanUrl, options).pipe(
        map((meals: any) =>
        {
            return meals.map((meal: any) => ({
              id: meal.recipe_id,
              title: meal.recipe_title,
              nutrition: meal.recipe_nutrition,
              image: meal.recipe_image_path,
              servings: meal.recipe_servings,
              cookTime: meal.recipe_cook_time,
              mainIngredient: meal.recipe_main_ingredient,
              prepTime: meal.recipe_prep_time
            })) || []
          }
        ),
        catchError(handleError('getMealPlan', []))).toPromise()
    }).catch(err => {
      alert('We could not save your meal plan, please try again later');
      console.log(err)
    })

  }


  // async getMealPlanFromServer_backup(): Promise<any> {
  //   // backend

  //   return await Auth.currentSession().then(res => {
  //     let accessToken = res.getIdToken().getJwtToken()
  //     const options = {
  //       headers: new HttpHeaders().set('Authorization', accessToken)
  //         .set('Content-Type', 'application/json')
  //     }
  //     return this.http.get(this.apiHost + this.mealPlanUrl, options).pipe(
  //       map((meals: any) =>

  //         meals.map((meal: any) => ({
  //           id: meal.recipe_id,
  //           title: meal.recipe_title,
  //           nutrition: meal.recipe_nutrition,
  //           image: meal.recipe_image_path,
  //           servings: meal.recipe_servings,
  //           cookTime: meal.recipe_cook_time,
  //           mainIngredient: meal.recipe_main_ingredient,
  //           prepTime: meal.recipe_prep_time
  //         })) || []
  //       ), 
  //       catchError(handleError('getMealPlan', []))).toPromise()
  //   }).catch(err => {
  //     alert('We could not save your meal plan, please try again later');
  //     console.log(err)
  //   })

  // }

  async getMealPlanFromLocalStorage(): Promise<any> {
    // localstorage
    return Promise.resolve().then(() => JSON.parse(localStorage.getItem('mealPlan')) || []);
  }
}
