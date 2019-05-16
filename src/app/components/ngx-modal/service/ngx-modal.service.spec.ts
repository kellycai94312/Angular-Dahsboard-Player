import {inject, TestBed} from '@angular/core/testing';

import {NgxModalService} from './ngx-modal.service';

describe('NgxModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxModalService]
    });
  });

  it('should be created', inject([NgxModalService], (service: NgxModalService) => {
    expect(service).toBeTruthy();
  }));
});
