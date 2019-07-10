import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Input} from '@angular/core';
import {DialogResult} from '../../../../data/local/dialog-result';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {ItemDisplay} from './item-display';

export class BaseItemList<TModel extends IdentifiedObject, Q extends PageQuery> {

  @Input()
  public translationTitle: string;

  @Input()
  public itemDisplay: ItemDisplay;

  @Input()
  public canEdit: boolean;

  @Input()
  public query: Q = {} as Q;

  @Input()
  public compare: (o1: TModel, o2: TModel) => boolean = (o1, o2) => {
    return o1.id == o2.id;
  };

  @Input()
  public addItem: () => Promise<DialogResult<TModel>>;

  @Input()
  public fetchItems: (direction: Direction, query: Q) => Promise<PageContainer<TModel>>;

}
