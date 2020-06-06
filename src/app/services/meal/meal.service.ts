import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { handleError } from '../../utilities/helper-functions';
import { FIELDS } from './meal.fields';

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
    const httpParams = new HttpParams({
      fromObject: {
        page_start: page_start.toString(),
        page_size: page_size.toString(),
        lang: 'en-CA',
        fields: FIELDS,
        q: query || '',
        p_has_asset: "[[\"image\"]]"
      }
    })

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(environment.host + this.recipesUrl, httpParams.toString(), options).pipe(catchError(this.handleError('getMeals', [])));
  }


  /** GET meal by id. Will 404 if id not found */
  getMealById(id: any) {
    const httpParams = new HttpParams({
      fromObject: {
        fieldset: 'all',
        fields: FIELDS,
      }
    })

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post(environment.host + this.recipesUrl + `/${id}`, httpParams.toString(), options).pipe(
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
