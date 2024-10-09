import { TestBed } from '@angular/core/testing';

import { FirmenDatenService } from './firmen-daten.service';

describe('FirmenDatenService', () => {
  let service: FirmenDatenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmenDatenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
