import { TestBed } from '@angular/core/testing';

import { ResultsViewCreatorService } from './results-view-creator.service';

describe('ResultsViewCreatorService', () => {
  let service: ResultsViewCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsViewCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
