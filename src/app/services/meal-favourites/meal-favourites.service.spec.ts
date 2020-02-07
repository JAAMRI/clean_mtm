import { TestBed } from '@angular/core/testing';

import { MealFavouritesService } from './meal-favourites.service';

describe('MealFavouritesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealFavouritesService = TestBed.get(MealFavouritesService);
    expect(service).toBeTruthy();
  });
});
