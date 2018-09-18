import {DictionaryTypeModule} from './dictionary-type.module';

describe('DictionaryTypeModule', () => {
  let dictionaryTypeModule: DictionaryTypeModule;

  beforeEach(() => {
    dictionaryTypeModule = new DictionaryTypeModule();
  });

  it('should create an instance', () => {
    expect(dictionaryTypeModule).toBeTruthy();
  });
});
