import {NgxEditableItemModule} from './ngx-editable-item.module';

describe('NgxEditableItemModule', () => {
  let ngxEditableItemModule: NgxEditableItemModule;

  beforeEach(() => {
    ngxEditableItemModule = new NgxEditableItemModule();
  });

  it('should create an instance', () => {
    expect(ngxEditableItemModule).toBeTruthy();
  });
});
