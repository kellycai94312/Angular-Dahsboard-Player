import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ItemDisplay} from '../../../../../module/common/item-list/model/item-display';

@Injectable()
export class GroupsService {

  private readonly _searchSubject = new BehaviorSubject<string>('');
  private readonly _itemDisplaySubject = new BehaviorSubject<ItemDisplay>(ItemDisplay.GRID);

  public get changedSearchText$(): Observable<string> {
    return this._searchSubject.asObservable();
  }

  public get changedItemDisplay$(): Observable<ItemDisplay> {
    return this._itemDisplaySubject.asObservable();
  }

  public setSearchText(value: string): void {
    this._searchSubject.next(value);
  }

  public setItemDisplay(value: ItemDisplay): void {
    this._itemDisplaySubject.next(value);
  }

}
