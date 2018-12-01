import {NgxInputModule} from './ngx-input.module';

describe('NgxInputModule', () => {
  let ngxInputModule: NgxInputModule;

  beforeEach(() => {
    ngxInputModule = new NgxInputModule();
  });

  it('should create an instance', () => {
    expect(ngxInputModule).toBeTruthy();
  });
});
