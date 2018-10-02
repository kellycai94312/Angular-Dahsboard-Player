import {NgxButtonModule} from './ngx-button.module';

describe('NgxButtonModule', () => {
  let ngxButtonModule: NgxButtonModule;

  beforeEach(() => {
    ngxButtonModule = new NgxButtonModule();
  });

  it('should create an instance', () => {
    expect(ngxButtonModule).toBeTruthy();
  });
});
