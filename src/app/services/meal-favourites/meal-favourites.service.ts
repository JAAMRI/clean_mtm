import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { catchError, map } from 'rxjs/operators';
import { handleError } from '../../../app/utilities/helper-functions';
import { environment } from '../../../environments/environment';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class MealFavouritesService {

  apiHost = environment.host;
  private favouritesUrl = '/favourites';  // URL to web api


  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router,
  ) { }

  saveMealFavourites(favourites: any, recipeId: string, action: string = 'add'): Promise<any> {
    if (!this.accountService.loggedIn) {
      const currentRoute = this.router.url;

      this.router.navigate(['/auth/login'], {
        queryParams: {
          returnUrl: currentRoute
        },
        queryParamsHandling: "merge" 
      })
    }
    return this.accountService.loggedIn ? this.saveMealFavouritesToServer(favourites, recipeId, action) : this.storeMealFavourites(favourites, recipeId, action);
  }

  async saveMealFavouritesToServer(favourites: any, recipeId: string, action: string): Promise<any> {
    // backend
    // console.log(favourites, recipeId, action)
    const recipe = favourites.find(recipe => recipe.id == recipeId);
    const payload = {
      "recipe_id": recipe.id,
      "recipe_title": recipe.title,
      "recipe_image_path": recipe.image
    }
    //These values could be null
    payload['recipe_nutrition'] = (recipe.hasOwnProperty('nutrition')) ? recipe.nutrition : null;
    payload['recipe_main_ingredient'] = (recipe.hasOwnProperty('mainIngredient')) ? recipe.mainIngredient : null;
    payload['recipe_cook_time'] = (recipe.hasOwnProperty('cookTime')) ? recipe.cookTime : null;
    payload['recipe_prep_time'] = (recipe.hasOwnProperty('prepTime')) ? recipe.prepTime : null;
    payload['recipe_servings'] = (recipe.hasOwnProperty('servings')) ? recipe.servings : null;

    return await Auth.currentSession().then(res => {
      let accessToken = res.getIdToken().getJwtToken()
      const headers = {
        headers: new HttpHeaders().set('Authorization', accessToken)
          .set('Content-Type', 'application/json')
      }

      if (action === 'remove') {
        return this.http.delete(this.apiHost + this.favouritesUrl + `/${recipeId}`, headers).pipe(catchError(handleError('saveMealPlan', []))).toPromise();
      }
      return this.http.post(this.apiHost + this.favouritesUrl, payload, headers).pipe(catchError(handleError('saveMealPlan', []))).toPromise();

    }).catch(err => {
      alert('We could not save your meal plan, please try again later');
      console.log(err)
    })
  }

  async storeMealFavourites(favourites: any, mealId: string, action: string): Promise<any> {
    const stringifiedFavourites = action === 'remove' ? JSON.stringify(favourites.filter((meal) => meal.id !== mealId)) : JSON.stringify(favourites)
    // check if the action is removed, then save the favourites without that specific meal  in local storage... otherwise save the current favourites that has the added  meal
    return Promise.resolve().then(function () {
      localStorage.setItem('favourites', stringifiedFavourites);
    });
    // //local storage
    // return Promise.resolve().then(() =>
    //   localStorage.setItem('favourites', JSON.stringify(favourites))
    // );
  }

  getMealFavourites(): Promise<any> {
    return this.accountService.loggedIn ? this.getMealFavouritesFromServer() : this.getMealFavouritesFromLocalStorage();
  }

  async getMealFavouritesFromServer(): Promise<any> {
    // backend
    return await Auth.currentSession().then(res => {
      let accessToken = res.getIdToken().getJwtToken()
      const options = {
        headers: new HttpHeaders().set('Authorization', accessToken)
          .set('Content-Type', 'application/json')
      }
      return this.http.get(this.apiHost + this.favouritesUrl, options).pipe(
        map((meals: any) =>

          meals.map((meal: any) => ({
            id: meal.recipe_id,
            title: meal.recipe_title,
            nutrition: meal.recipe_nutrition,
            image: meal.recipe_image_path,
            servings: meal.recipe_servings,
            cookTime: meal.recipe_cook_time,
            mainIngredient: meal.recipe_main_ingredient,
            prepTime: meal.recipe_prep_time
          }))
        ), catchError(handleError('getMealPlan', []))).toPromise();
    }).catch(err => {
      alert('We could not get your meal favourites, please try again later');
      console.log(err)
    })

  }

  async getMealFavouritesFromLocalStorage(): Promise<any> {
    // localstorage
    return Promise.resolve().then(() => JSON.parse(localStorage.getItem('favourites')) || []);
  }
}
