import {EventReportQuery} from './event-report-query';

export class TestingReportQuery extends EventReportQuery {
  realData?: boolean;

  constructor() {
    super();
    this.realData = true;
  }
}
