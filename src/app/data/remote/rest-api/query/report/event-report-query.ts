import {ReportQuery} from './report-query';

export class EventReportQuery extends ReportQuery {
  showRadarCharts?: boolean;
  showReactorScore?: boolean;
  showChartSimpleLegend?: boolean;
  showChartFullLegend?: boolean;
  showPerspective?: boolean;
  showReal?: boolean;
  showTeamByPersonal?: boolean;
}
