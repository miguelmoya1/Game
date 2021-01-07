import { TestBed } from '@angular/core/testing';

import { RsService } from './rs.service';

describe('RsService', () => {
  let service: RsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
