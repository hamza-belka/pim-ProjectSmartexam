import { TestBed } from '@angular/core/testing';

import { CorrectionserviceService } from './correctionservice.service';

describe('CorrectionserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorrectionserviceService = TestBed.get(CorrectionserviceService);
    expect(service).toBeTruthy();
  });
});
