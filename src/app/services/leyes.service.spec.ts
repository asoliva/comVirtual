import { TestBed } from '@angular/core/testing';

import { LeyesService } from './leyes.service';

describe('LeyesService', () => {
  let service: LeyesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeyesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
