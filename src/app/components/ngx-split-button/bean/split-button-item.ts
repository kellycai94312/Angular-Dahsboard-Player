export class SplitButtonItem {
  public nameKey: string;
  public callback: () => Promise<void>;
  public default?: boolean;
}
