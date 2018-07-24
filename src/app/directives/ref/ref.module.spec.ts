import { RefModule } from './ref.module';

describe('RefModule', () => {
  let refModule: RefModule;

  beforeEach(() => {
    refModule = new RefModule();
  });

  it('should create an instance', () => {
    expect(refModule).toBeTruthy();
  });
});
