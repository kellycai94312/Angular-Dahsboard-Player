import {NgxGridModule} from './ngx-grid.module';

describe('NgxGridModule', () => {
  let ngxGridModule: NgxGridModule;

  beforeEach(() => {
    ngxGridModule = new NgxGridModule();
  });

  it('should create an instance', () => {
    expect(ngxGridModule).toBeTruthy();
  });
});
