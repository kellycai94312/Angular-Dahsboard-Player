import {PersonItemModule} from './person-item.module';

describe('PersonItemModule', () => {
  let personItemModule: PersonItemModule;

  beforeEach(() => {
    personItemModule = new PersonItemModule();
  });

  it('should create an instance', () => {
    expect(personItemModule).toBeTruthy();
  });
});
