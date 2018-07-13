import {NgxButtonGroupModule} from './ngx-button-group.module';

describe('NgxButtonGroupModule', () => {
  let ngxButtonGroupModule: NgxButtonGroupModule;

  beforeEach(() => {
    ngxButtonGroupModule = new NgxButtonGroupModule();
  });

  it('should create an instance', () => {
    expect(ngxButtonGroupModule).toBeTruthy();
  });
});
