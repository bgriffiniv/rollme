import { TestBed } from '@angular/core/testing';

import { LinkedinUserAuthdataService } from './linkedin-user-authdata.service';

describe('LinkedinUserAuthdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkedinUserAuthdataService = TestBed.get(LinkedinUserAuthdataService);
    expect(service).toBeTruthy();
  });
});
