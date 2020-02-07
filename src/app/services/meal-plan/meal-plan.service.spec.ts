import { TestBed } from '@angular/core/testing';

import { MealPlanService } from './meal-plan.service';

describe('MealPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealPlanService = TestBed.get(MealPlanService);
    expect(service).toBeTruthy();
  });
});
