import {EditEventModule} from './edit-event.module';

describe('EditEventModule', () => {
  let editEventModule: EditEventModule;

  beforeEach(() => {
    editEventModule = new EditEventModule();
  });

  it('should create an instance', () => {
    expect(editEventModule).toBeTruthy();
  });
});
