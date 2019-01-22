import { TestBed } from '@angular/core/testing';

import { HockbaseService } from './hockbase.service';

describe('HockbaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HockbaseService = TestBed.get(HockbaseService);
    expect(service).toBeTruthy();
  });
});
