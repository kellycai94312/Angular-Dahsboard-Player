import {NgxSplitButtonModule} from './ngx-split-button.module';

describe('NgxSplitButtonModule', () => {
  let ngxSplitButtonModule: NgxSplitButtonModule;

  beforeEach(() => {
    ngxSplitButtonModule = new NgxSplitButtonModule();
  });

  it('should create an instance', () => {
    expect(ngxSplitButtonModule).toBeTruthy();
  });
});
