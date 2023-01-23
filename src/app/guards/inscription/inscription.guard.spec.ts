import { TestBed } from '@angular/core/testing';

import { InscriptionGuard } from './inscription.guard';

describe('InscriptionGuard', () => {
  let guard: InscriptionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InscriptionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
