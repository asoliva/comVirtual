import { TestBed } from '@angular/core/testing';

import { TipoDenunciaService } from './tipo-denuncia.service';

describe('TipoDenunciaService', () => {
  let service: TipoDenunciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDenunciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
