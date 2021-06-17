import { TestBed } from '@angular/core/testing';

import { SymbolInjecterService } from './symbol-injecter.service';

describe('SymbolInjecterService', () => {
  let service: SymbolInjecterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymbolInjecterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
