export class SplitButtonItem {
  public nameKey: string;
  public callback: () => Promise<void>;
  public order?: number;
  public default?: boolean;
}
