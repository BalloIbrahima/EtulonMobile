import { TestBed } from '@angular/core/testing';

import { TabsGuard } from './tabs.guard';

describe('TabsGuard', () => {
  let guard: TabsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TabsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
