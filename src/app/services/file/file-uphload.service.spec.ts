import { TestBed } from '@angular/core/testing';

import { FileUphloadService } from './file-uphload.service';

describe('FileUphloadService', () => {
  let service: FileUphloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUphloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
