import { TestBed } from '@angular/core/testing';

import { DatenService } from './api-data.service';

describe('ApiDataService', () => {
  let service: DatenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
