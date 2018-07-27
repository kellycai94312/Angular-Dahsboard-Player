import { NgxModalModule } from './ngx-modal.module';

describe('NgxModalModule', () => {
  let ngxModalModule: NgxModalModule;

  beforeEach(() => {
    ngxModalModule = new NgxModalModule();
  });

  it('should create an instance', () => {
    expect(ngxModalModule).toBeTruthy();
  });
});
