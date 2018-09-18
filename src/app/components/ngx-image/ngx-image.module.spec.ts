import {NgxImageModule} from './ngx-image.module';

describe('NgxImageModule', () => {
  let ngxImageModule: NgxImageModule;

  beforeEach(() => {
    ngxImageModule = new NgxImageModule();
  });

  it('should create an instance', () => {
    expect(ngxImageModule).toBeTruthy();
  });
});
