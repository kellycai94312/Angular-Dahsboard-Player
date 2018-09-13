import {NgxSelectionModule} from './ngx-selection.module';

describe('NgxSelectionModule', () => {
  let ngxSelectionModule: NgxSelectionModule;

  beforeEach(() => {
    ngxSelectionModule = new NgxSelectionModule();
  });

  it('should create an instance', () => {
    expect(ngxSelectionModule).toBeTruthy();
  });
});
