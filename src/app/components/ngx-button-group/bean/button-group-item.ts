export class ButtonGroupItem {
  public callback: (originalObject?: any) => Promise<void>;
  public name?: string;
  public nameKey?: string;
  public originalObject?: any;
}
