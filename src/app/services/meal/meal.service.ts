import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FIELDS } from './meal.fields';
import { AccountService } from '../account/account.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  apiHost = environment.host;


  private recipesUrl = '/recipes';  // URL to web api

  constructor(private http: HttpClient, @Inject(LOCALE_ID) public locale: string) {
  }

  //Get Meals from API
  getMeals(pageStart: number, pageSize: number, query?: string, params?: any): Observable<any> {
    const httpParams = new HttpParams({
      fromObject: {
        page_start: pageStart.toString(),
        page_size: pageSize.toString(),
        lang: this.locale === 'fr' ? `fr-CA` : 'en-CA',
        fields: FIELDS ,
        q: query || '',
        p_has_asset: "[[\"image\"]]",
        ...params
      }
    })
    // +  `, p_translate_nutrients=${this.locale === 'fr'}`,
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(environment.host + this.recipesUrl, httpParams.toString(), options).pipe(
      map((meals: any) => {
        if (!meals['success']) {
          throw  'error';
        }
        return {
          didYouMean: meals.results === 0 ? meals.did_you_mean : null,
          results: meals.results,
          items: meals.data?.map((meal: any, index: any) => ({
            id: meal.recipe_id,
            image: meal.assets.image.default[0].thumb_url,
            cuisine: meal.cuisines && (Object.keys(meal.cuisines).length === 0) ? null : meal.cuisines[0].description,
            title: meal.title,
            nutrition: meal.nutrients_legacy,
            cookTime: meal.cook_time,
            prepTime: meal.prep_time,
            servings: meal.yield.value + " " + meal.yield.measure,
            ingredients: meal.ingredients[this.locale === 'fr' ? 'non classés' : 'ungrouped'].list,
            instructions: meal.methods[this.locale === 'fr' ? 'non classés' : 'ungrouped'].list,
            mainIngredient: (Object.keys(meal.main_ingredient).length === 0) ? null : meal.main_ingredient[0].description
          }))
        }
      }), catchError((err) => { console.log(err); throw 'Error fetching meals, please try again later'}));
  }


  /** GET meal by id. Will 404 if id not found */
  getMealById(id: any): Observable<any> {
    const httpParams = new HttpParams({
      fromObject: {
        fieldset: 'all',
        fields: FIELDS,
        lang: this.locale === 'fr' ? `fr-CA` : 'en-CA'
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
          image: meal.data.assets.image.default[0].versions.default[0].url || meal.data.assets.image.default[0].url,
          description: meal.data.description || meal.data.short_description,
          cookTime: meal.data.cook_time,
          mainIngredient: (Object.keys(meal.data.main_ingredient).length === 0) ? null : meal.data.main_ingredient[0].description,
          prepTime: meal.data.prep_time,
          servings: meal.data.yield ? `${(meal.data.yield.value || meal.data.yield.value_display)} ${meal.data.yield.measure}` : `0 servings`,
          ingredients:  meal.data.ingredients[this.locale === 'fr' ? 'non classés' : 'ungrouped'].list,
          instructions: meal.data.methods[this.locale === 'fr' ? 'non classés' : 'ungrouped'].list,
          cuisine: (Object.keys(meal.data.cuisines).length === 0) ? null : meal.data.cuisines[0].description,
          relatedRecipes: meal.data.related_recipes.map((recipe: any) => ({
            id: recipe.recipe_id,
            title: recipe.title,
            image: recipe.assets.image.default[0].url,
          }))
        }
      }), catchError((err) => { console.log(err); throw 'Error fetching meal, please try again later'}))

  }
}
