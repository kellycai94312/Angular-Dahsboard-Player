export class PersonalReportSettings {

  public showRadarCharts: boolean;
  public showReactorScore: boolean;
  public showChartSimpleLegend: boolean;
  public showChartFullLegend: boolean;
  public showPerspective: boolean;
  public showReal: boolean;
  public showTeamByPersonal: boolean;

  constructor() {
    this.showRadarCharts = false;
    this.showReactorScore = false;
    this.showChartSimpleLegend = false;
    this.showChartFullLegend = false;
    this.showPerspective = false;
    this.showReal = false;
    this.showTeamByPersonal = false;
  }

}
