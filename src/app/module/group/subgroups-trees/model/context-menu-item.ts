export class ContextMenuItem {
  public translation;
  public action: (item: ContextMenuItem) => Promise<void>;
  public iconName?: string;
}
