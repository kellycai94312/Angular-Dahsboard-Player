import {TestBed} from '@angular/core/testing';

import {TemplateModalService} from './template-modal.service';

describe('TemplateModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateModalService = TestBed.get(TemplateModalService);
    expect(service).toBeTruthy();
  });
});
