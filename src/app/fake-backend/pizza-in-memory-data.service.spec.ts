import { TestBed } from '@angular/core/testing';

import { PizzaInMemoryDataService } from './pizza-in-memory-data.service';

describe('PizzaInMemoryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PizzaInMemoryDataService = TestBed.get(PizzaInMemoryDataService);
    expect(service).toBeTruthy();
  });
});
