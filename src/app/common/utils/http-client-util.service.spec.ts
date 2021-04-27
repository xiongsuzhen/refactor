import { TestBed } from '@angular/core/testing';

import { HttpClientUtil } from './http-client-util.service';

describe('HttpClientUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpClientUtil = TestBed.get(HttpClientUtil);
    expect(service).toBeTruthy();
  });
});
