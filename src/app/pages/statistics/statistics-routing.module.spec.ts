import {StatisticsRoutingModule} from './statistics-routing.module';

describe('StatisticsRoutingModule', () => {
  let statisticsRoutingModule: StatisticsRoutingModule;

  beforeEach(() => {
    statisticsRoutingModule = new StatisticsRoutingModule();
  });

  it('should create an instance', () => {
    expect(statisticsRoutingModule).toBeTruthy();
  });
});
