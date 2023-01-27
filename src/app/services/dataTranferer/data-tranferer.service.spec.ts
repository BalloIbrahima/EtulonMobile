import { TestBed } from '@angular/core/testing';

import { DataTranfererService } from './data-tranferer.service';

describe('DataTranfererService', () => {
  let service: DataTranfererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTranfererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
