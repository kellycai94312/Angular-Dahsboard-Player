export class SplitButtonItem {
  public nameKey: string;
  public callback: (data?: SplitButtonItem) => Promise<void>;
  public default?: boolean;
  public visible?: () => boolean;
  public data?: any;
}
