import {GroupItemModule} from './group-item.module';

describe('GroupItemModule', () => {
  let groupItemModule: GroupItemModule;

  beforeEach(() => {
    groupItemModule = new GroupItemModule();
  });

  it('should create an instance', () => {
    expect(groupItemModule).toBeTruthy();
  });
});
