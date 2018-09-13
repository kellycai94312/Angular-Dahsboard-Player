import {NgxTextBoxModule} from './ngx-text-box.module';

describe('NgxTextBoxModule', () => {
  let ngxTextBoxModule: NgxTextBoxModule;

  beforeEach(() => {
    ngxTextBoxModule = new NgxTextBoxModule();
  });

  it('should create an instance', () => {
    expect(ngxTextBoxModule).toBeTruthy();
  });
});
