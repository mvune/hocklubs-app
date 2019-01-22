import { TestBed } from '@angular/core/testing';

import { HocklubService } from './hocklub.service';

describe('HocklubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HocklubService = TestBed.get(HocklubService);
    expect(service).toBeTruthy();
  });
});
