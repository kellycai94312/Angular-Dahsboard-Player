import {OperatorValueModule} from './operator-value.module';

describe('OperatorValueModule', () => {
  let operatorValueModule: OperatorValueModule;

  beforeEach(() => {
    operatorValueModule = new OperatorValueModule();
  });

  it('should create an instance', () => {
    expect(operatorValueModule).toBeTruthy();
  });
});
