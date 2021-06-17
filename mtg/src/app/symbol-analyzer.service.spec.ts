import { TestBed } from '@angular/core/testing';

import { SymbolAnalyzerService } from './symbol-analyzer.service';

describe('SymbolAnalyzerService', () => {
  let service: SymbolAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymbolAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
