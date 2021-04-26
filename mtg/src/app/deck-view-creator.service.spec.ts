import { TestBed } from '@angular/core/testing';

import { DeckViewCreatorService } from './deck-view-creator.service';

describe('DeckViewCreatorService', () => {
  let service: DeckViewCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckViewCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
