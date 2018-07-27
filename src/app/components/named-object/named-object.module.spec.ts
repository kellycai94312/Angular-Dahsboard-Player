import { NamedObjectModule } from './named-object.module';

describe('NamedObjectModule', () => {
  let namedObjectModule: NamedObjectModule;

  beforeEach(() => {
    namedObjectModule = new NamedObjectModule();
  });

  it('should create an instance', () => {
    expect(namedObjectModule).toBeTruthy();
  });
});
