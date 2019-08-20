export class MenuItem {
  public translationLabel?: string;
  public label?: string;
  public iconName?: string;
  public data?: any;
  public action?: (item: MenuItem) => void;
}
