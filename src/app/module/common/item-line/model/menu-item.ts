export class MenuItem {
  public translationLabel?: string;
  public label?: string;
  public iconName?: string;
  public data?: any;
  public hidden?: boolean;
  public action?: (item: MenuItem) => void;
}
