import {NgxFormModule} from './ngx-form.module';

describe('NgxFormModule', () => {
  let ngxFormModule: NgxFormModule;

  beforeEach(() => {
    ngxFormModule = new NgxFormModule();
  });

  it('should create an instance', () => {
    expect(ngxFormModule).toBeTruthy();
  });
});
