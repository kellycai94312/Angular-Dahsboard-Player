import {TestBed} from '@angular/core/testing';

import {ModalBuilderService} from './modal-builder.service';

describe('ModalBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalBuilderService = TestBed.get(ModalBuilderService);
    expect(service).toBeTruthy();
  });
});
