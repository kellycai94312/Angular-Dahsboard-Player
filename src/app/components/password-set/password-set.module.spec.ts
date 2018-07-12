import {PasswordSetModule} from './password-set.module';

describe('PasswordSetModule', () => {
  let passwordSetModule: PasswordSetModule;

  beforeEach(() => {
    passwordSetModule = new PasswordSetModule();
  });

  it('should create an instance', () => {
    expect(passwordSetModule).toBeTruthy();
  });
});
