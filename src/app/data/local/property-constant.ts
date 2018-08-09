export class PropertyConstant {
  public static readonly pageSize: number = 25;
  public static readonly pageSizeMax: number = 2147483647;
  public static readonly searchDebounceTime: number = 300;

  public static readonly dateFormat: string = 'yyyy-MM-dd';
  /**
   * @deprecated Use dateTimeServerFormat
   */
  public static readonly dateTimeFormat: string = 'yyyy-MM-dd HH:mm:ss.SSS\'GMT\'';

  public static readonly dateTimeServerFormat: string = 'yyyy-MM-dd HH:mm:ss.SSS\'GMT\'';
}
