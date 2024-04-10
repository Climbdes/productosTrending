import { TestBed } from '@angular/core/testing';

import { DermacolService } from './dermacol.service';

describe('DermacolService', () => {
  let service: DermacolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DermacolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
