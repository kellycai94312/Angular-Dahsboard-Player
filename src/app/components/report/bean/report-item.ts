import {ReportType} from './report-type';

export class ReportItem {
  public type: ReportType;
  public nameKey: string;
  public param?: any;
  public getReport: (settings?: any) => Promise<boolean>;
  public editSettings?: (reportItem: ReportItem) => Promise<void>;
  public settings?: any;
}
