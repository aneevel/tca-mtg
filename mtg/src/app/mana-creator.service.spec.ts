import { TestBed } from '@angular/core/testing';

import { ManaCreatorService } from './mana-creator.service';

describe('ManaCreatorService', () => {
  let service: ManaCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManaCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
