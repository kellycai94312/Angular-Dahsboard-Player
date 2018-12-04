export class MenuItem {
  public routerLink: string;
  public nameKey?: string;
  public iconClassName: string;
  public count?: number;
  public enabled?: boolean;
  public action?: (item: MenuItem) => void;
}
