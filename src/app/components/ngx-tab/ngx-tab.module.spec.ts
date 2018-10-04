import {NgxTabModule} from './ngx-tab.module';

describe('NgxTabModule', () => {
  let ngxTabModule: NgxTabModule;

  beforeEach(() => {
    ngxTabModule = new NgxTabModule();
  });

  it('should create an instance', () => {
    expect(ngxTabModule).toBeTruthy();
  });
});
