import { TestBed } from '@angular/core/testing';

import { SpringJoueurService } from './spring-joueur.service';

describe('SpringJoueurService', () => {
  let service: SpringJoueurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringJoueurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
