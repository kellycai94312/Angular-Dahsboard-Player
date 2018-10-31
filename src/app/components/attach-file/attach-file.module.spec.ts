import {AttachFileModule} from './attach-file.module';

describe('AttachFileModule', () => {
  let attachFileModule: AttachFileModule;

  beforeEach(() => {
    attachFileModule = new AttachFileModule();
  });

  it('should create an instance', () => {
    expect(attachFileModule).toBeTruthy();
  });
});
