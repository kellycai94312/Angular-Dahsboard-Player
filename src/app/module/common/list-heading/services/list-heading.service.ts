import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ItemDisplay} from '../../item-list/model/item-display';

@Injectable()
export class ListHeadingService {

  private readonly _searchSubject = new BehaviorSubject<string>('');
  private readonly _itemDisplaySubject = new BehaviorSubject<ItemDisplay>(ItemDisplay.GRID);

  constructor() {
  }

  public get search$(): Observable<string> {
    return this._searchSubject.asObservable();
  }

  public get itemDisplay$(): Observable<ItemDisplay> {
    return this._itemDisplaySubject.asObservable();
  }

  public updateSearch(value: string): void {
    this._searchSubject.next(value);
  }

  public updateItemDisplay(value: ItemDisplay): void {
    this._itemDisplaySubject.next(value);
  }

}
