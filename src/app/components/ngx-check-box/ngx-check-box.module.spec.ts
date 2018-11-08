import {NgxCheckBoxModule} from './ngx-check-box.module';

describe('NgxCheckBoxModule', () => {
  let ngxCheckBoxModule: NgxCheckBoxModule;

  beforeEach(() => {
    ngxCheckBoxModule = new NgxCheckBoxModule();
  });

  it('should create an instance', () => {
    expect(ngxCheckBoxModule).toBeTruthy();
  });
});
