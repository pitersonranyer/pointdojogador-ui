import { TestBed } from '@angular/core/testing';

import { CartelaService } from './cartela.service';

describe('CartelaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartelaService = TestBed.get(CartelaService);
    expect(service).toBeTruthy();
  });
});
