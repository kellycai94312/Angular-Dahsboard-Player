import {GroupSettingsModule} from './group-settings.module';

describe('GroupSettingsModule', () => {
  let groupSettingsModule: GroupSettingsModule;

  beforeEach(() => {
    groupSettingsModule = new GroupSettingsModule();
  });

  it('should create an instance', () => {
    expect(groupSettingsModule).toBeTruthy();
  });
});
