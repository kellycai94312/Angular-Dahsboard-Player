import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChipListComponent<T extends any> {

  @Input()
  public labelTranslation: string;

  @Input()
  public selectedItems: T[] = [];

  @Input()
  public display?: ((item: any) => string) | string;

  @Output()
  public readonly selectedItemsChange = new EventEmitter<T[]>();

  @Output()
  public readonly edit = new EventEmitter<T[]>();

  public onEdit(): void {
    this.edit.emit(this.selectedItems);
  }

  public onRemove(item: T): void {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.selectedItemsChange.emit(this.selectedItems);
  }

  public getDisplay(item: any): string {
    if (typeof this.display === 'string') {
      return item[this.display];
    } else if (typeof this.display === 'function') {
      return this.display(item);
    }
    return item as any;
  }

}
