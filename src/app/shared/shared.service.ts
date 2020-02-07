import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  _groceryListPageVisited = false;
  _chatPageVisited = false;
  
  constructor() { }

  set groceryListPageVisited(visited: boolean) {
    this._groceryListPageVisited = visited;
  }

  get groceryListPageVisited() {
    return this._groceryListPageVisited;
  }

  set chatPageVisited(visited: boolean) {
    this._chatPageVisited = visited;
  }

  get chatPageVisited() {
    return this._chatPageVisited;
  }


}
