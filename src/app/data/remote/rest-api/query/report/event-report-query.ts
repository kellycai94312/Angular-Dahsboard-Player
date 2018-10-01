import {ReportQuery} from './report-query';

export class EventReportQuery extends ReportQuery {
  showRadarCharts?: boolean;
  showReactorScore?: boolean;
  showChartSimpleLegend?: boolean;
  showChartFullLegend?: boolean;
  showPerspective?: boolean;
  showReal?: boolean;
  showTeamByPersonal?: boolean;

  constructor() {
    super();
    this.showRadarCharts = true;
    this.showReactorScore = true;
    this.showChartSimpleLegend = true;
    this.showChartFullLegend = false;
    this.showPerspective = true;
    this.showReal = true;
    this.showTeamByPersonal = true;
  }
}
