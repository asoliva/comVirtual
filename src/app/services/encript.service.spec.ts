import { TestBed } from '@angular/core/testing';

import { EncriptService } from './encript.service';

describe('EncriptService', () => {
  let service: EncriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
