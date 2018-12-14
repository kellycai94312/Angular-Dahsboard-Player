import {PersonActivationModule} from './person-activation.module';

describe('PersonActivationModule', () => {
  let personActivationModule: PersonActivationModule;

  beforeEach(() => {
    personActivationModule = new PersonActivationModule();
  });

  it('should create an instance', () => {
    expect(personActivationModule).toBeTruthy();
  });
});
