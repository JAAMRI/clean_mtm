import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from '../utilities/helper-functions';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  apiHost = environment.host;
  private recipesUrl = '/recipes';  // URL to web api

  constructor(private http: HttpClient) {
  }

  //Get Meals from API
  getMeals(page_start: number, page_size: number, query?: string): Observable<any> {

    let body = new URLSearchParams()
    body.set('page_start', page_start.toString())
    body.set('page_size', page_size.toString())
    body.set('lang', "en-CA")
    // body.set('fields', "recipe_id, title, nutrients_legacy, description, comments, cook_time, ready_time, prep_time, wait_time, total_time, calculated_nutrients_per_serving, creation_time, yield, assets");
    body.set('fields', "recipe_id, main_ingredient, cuisines, methods, ingredients, related_recipes, title, nutrients_legacy, description, comments, cook_time, ready_time, prep_time, wait_time, total_time, calculated_nutrients_per_serving, creation_time, yield, assets")
    body.set('q', (query ? query : "")); //either search query if exists or search user preferences
    // body.set('fieldset', "all");
    body.set('p_has_asset', "[[\"image\"]]");
    // body.set('p_has_rank', "yes");
    // body.set('sort_by', "rank");

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(environment.host + this.recipesUrl, body.toString(), options).pipe(catchError(this.handleError('getMeals', [])));
  }

  /* GET meals whose name contains search term */
  // searchMeals(q: string, preferences: string, start: number, pageSize: number): Observable<any> {console.log(q + " from searchmeals service")
  // let options = {
  //   headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  // };
  // preferences = preferences.split('|').join(' ');
  // const body = getSearchBody(q, preferences, start, pageSize);
  // return this.http.post("https://uat-synd-scm.constant.co/api/v4" + this.mealsUrl, body.toString(), options).pipe(
  //   map((res: any) => {
  //     // console.log(res);
  //     const meals = res.data;
  //     return {
  //       didYouMean: res.did_you_mean,
  //       meals: meals.map((meal: any) => ({
  //         id: meal.recipe_id,
  //         title: meal.title,
  //         mainIngredient: meal.main_ingredient[0] ? meal.main_ingredient[0].description : '',
  //         nutrition: meal.nutrients_legacy,
  //         amountInMealPlan: 0,
  //         image: meal.assets.image.default[0].url,
  //         cookTime: meal.cook_time,
  //         prepTime: meal.prep_time,
  //         servings: meal.yield ? `${(meal.yield.value || meal.yield.value_display)} ${meal.yield.measure}` : `0 servings`,
  //         ingredients: meal.ingredients.ungrouped.list,
  //         instructions: meal.methods.ungrouped.list,
  //       }))
  //     }

  //   }),
  //   catchError(handleError('searchMeals', [])));
  // // return this.http.get<any[]>(`${this.apiHost + this.mealsUrl}/?title=${q}`).pipe(
  // //   catchError(handleError<any[]>('searchMeals', []))
  // // );
  // }

  /** GET meal by id. Will 404 if id not found */
  getMealById(id: any) {
    const body = new URLSearchParams();
    body.set('fieldset', "all");
    body.set('fields', "recipe_id, related_recipes, title, nutrients_legacy, description, comments, cook_time, ready_time, prep_time, wait_time, total_time, calculated_nutrients_per_serving, creation_time, yield, assets");

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post(environment.host + this.recipesUrl + `/${id}`, body.toString(), options).pipe(
      map((meal: any) => {
        if (!meal.data) {
          throw new Error('Meal does not exist')
        }
        return {
          id: meal.data.recipe_id,
          title: meal.data.title,
          nutrition: meal.data.nutrients_legacy,
          image: meal.data.assets.image.default[0].url,
          description: meal.data.description || meal.data.short_description,
          cookTime: meal.data.cook_time,
          mainIngredient: (Object.keys(meal.data.main_ingredient).length === 0) ? null : meal.data.main_ingredient[0].description,
          prepTime: meal.data.prep_time,
          servings: meal.data.yield ? `${(meal.data.yield.value || meal.data.yield.value_display)} ${meal.data.yield.measure}` : `0 servings`,
          ingredients: meal.data.ingredients.ungrouped.list,
          instructions: meal.data.methods.ungrouped.list,
          cuisine: (Object.keys(meal.data.cuisines).length === 0) ? null : meal.data.cuisines[0].description,
          relatedRecipes: meal.data.related_recipes.map((recipe: any) => ({
            id: recipe.recipe_id,
            title: recipe.title,
            image: recipe.assets.image.default[0].url,
          }))
        }
      }))

  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed:`);
      console.dir(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
