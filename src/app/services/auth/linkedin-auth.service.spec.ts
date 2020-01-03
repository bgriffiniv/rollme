import { TestBed } from '@angular/core/testing';

import { LinkedinAuthService } from './linkedin-auth.service';

describe('LinkedinAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkedinAuthService = TestBed.get(LinkedinAuthService);
    expect(service).toBeTruthy();
  });
});
