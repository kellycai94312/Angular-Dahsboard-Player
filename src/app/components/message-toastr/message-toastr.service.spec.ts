import {inject, TestBed} from '@angular/core/testing';

import {MessageToastrService} from './message-toastr.service';

describe('MessageToastrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageToastrService]
    });
  });

  it('should be created', inject([MessageToastrService], (service: MessageToastrService) => {
    expect(service).toBeTruthy();
  }));
});
