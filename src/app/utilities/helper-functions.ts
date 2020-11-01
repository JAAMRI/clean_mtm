import { Observable, of } from 'rxjs';

export function  scrollToTop() {
  // window.scroll(0, 0)
}

/**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
export function handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/**
  * Shuffles array in place. ES6 version
  * @param {Array} a items An array containing the items.
  */
export function shuffleArray(a: any) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}