import { TestBed } from '@angular/core/testing';

import { GoogleUserService } from 'src/app/services/user/google-user.service';

describe('GoogleUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleUserService = TestBed.get(GoogleUserService);
    expect(service).toBeTruthy();
  });
});
