export class ReportAction {
  public nameKey: string;
  public param?: any;
  public action: () => Promise<boolean>;
  public settings?: () => Promise<boolean>;
}
