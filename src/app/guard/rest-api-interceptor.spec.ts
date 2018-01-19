import { TestBed, inject } from '@angular/core/testing';

import { RestApiInterceptor } from './rest-api-interceptor';

describe('RestApiInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestApiInterceptor]
    });
  });

  it('should be created', inject([RestApiInterceptor], (interceptor: RestApiInterceptor) => {
    expect(interceptor).toBeTruthy();
  }));
});
