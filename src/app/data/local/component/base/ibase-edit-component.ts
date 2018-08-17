export interface IBaseEditComponent {
  onSave(): Promise<boolean>;

  onRemove(): Promise<boolean>;
}
