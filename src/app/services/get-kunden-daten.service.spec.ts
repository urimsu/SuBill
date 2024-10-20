import { TestBed } from '@angular/core/testing';

import { GetKundenDatenService } from './get-kunden-daten.service';

describe('GetKundenDatenService', () => {
  let service: GetKundenDatenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetKundenDatenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
