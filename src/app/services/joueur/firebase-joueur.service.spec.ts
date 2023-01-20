import { TestBed } from '@angular/core/testing';

import { FirebaseJoueurService } from './firebase-joueur.service';

describe('FirebaseJoueurService', () => {
  let service: FirebaseJoueurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseJoueurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
