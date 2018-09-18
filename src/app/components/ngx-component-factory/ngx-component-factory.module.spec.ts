import {NgxComponentFactoryModule} from './ngx-component-factory.module';

describe('NgxComponentFactoryModule', () => {
  let ngxComponentFactoryModule: NgxComponentFactoryModule;

  beforeEach(() => {
    ngxComponentFactoryModule = new NgxComponentFactoryModule();
  });

  it('should create an instance', () => {
    expect(ngxComponentFactoryModule).toBeTruthy();
  });
});
