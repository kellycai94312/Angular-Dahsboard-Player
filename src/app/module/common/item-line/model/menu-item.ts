export class MenuItem {
  public translationLabel?: string;
  public label?: string;
  public iconName?: string;
  public action: (item: MenuItem) => void;
}
