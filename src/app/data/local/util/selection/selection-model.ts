import {Observable, Subject} from 'rxjs';
import {SelectionChange} from './selection-change';

export class SelectionModel<T> {

  public get changed(): Observable<SelectionChange<T>> {
    return this._changedSubject.asObservable();
  }

  public get selected(): T[] {
    return this._selection;
  }

  private readonly _selection: T[] = [];
  private readonly _changedSubject = new Subject<SelectionChange<T>>();
  private _selectedToEmit: T[] = [];
  private _deselectedToEmit: T[] = [];

  public compare: (a: T, b: T) => boolean = (a, b) => a === b;


  constructor(private _multiple = false,
              private _initiallySelectedValues?: T[],
              private _emitChanges = true) {
    if (_initiallySelectedValues && _initiallySelectedValues.length) {
      if (_multiple) {
        _initiallySelectedValues.forEach(value => this._markSelected(value));
      } else {
        this._markSelected(_initiallySelectedValues[0]);
      }
      this._selectedToEmit.length = 0;
    }
  }

  public select(...values: T[]): void {
    values.forEach((value) => this._markSelected(value));
    this._emitChangeEvent();
  }

  public deselect(...values: T[]): void {
    values.forEach((value) => this._unmarkSelected(value));
    this._emitChangeEvent();
  }

  public isSelected(value: T): boolean {
    return this._selection.some((x) => this.compare(x, value));
  }

  public toggle(value: T): void {
    this.isSelected(value) ? this.deselect(value) : this.select(value);
  }

  public isEmpty(): boolean {
    return this._selection.length === 0;
  }

  private _markSelected(value: T): void {
    if (!this.isSelected(value)) {
      if (!this._multiple) {
        this._unmarkAll();
      }

      this._selection.push(value);

      if (this._emitChanges) {
        this._selectedToEmit.push(value);
      }
    }
  }

  private _unmarkSelected(value: T): void {
    if (this.isSelected(value)) {
      this._selection.splice(this._selection.findIndex((x) => this.compare(x, value)), 1);

      if (this._emitChanges) {
        this._deselectedToEmit.push(value);
      }
    }
  }

  private _unmarkAll() {
    if (!this.isEmpty()) {
      this._selection.forEach(value => this._unmarkSelected(value));
    }
  }

  private _emitChangeEvent(): void {
    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      this._changedSubject.next({
        source: this,
        added: this._selectedToEmit,
        removed: this._deselectedToEmit
      });

      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }
  }

}
