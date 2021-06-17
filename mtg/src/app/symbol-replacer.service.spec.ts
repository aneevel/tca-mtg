import { TestBed } from '@angular/core/testing';

import { SymbolReplacerService } from './symbol-replacer.service';

describe('SymbolReplacerService', () => {
  let service: SymbolReplacerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymbolReplacerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
