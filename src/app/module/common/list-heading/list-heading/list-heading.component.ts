import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {MenuItem} from '../../item-line/model/menu-item';

@Component({
  selector: 'app-list-heading',
  templateUrl: './list-heading.component.html',
  styleUrls: ['./list-heading.component.scss']
})
export class ListHeadingComponent implements OnInit, OnDestroy {

  @Input()
  public translationTitle: string;

  @Input()
  public actions: MenuItem[] = [];

  @Output()
  public readonly searchTextChange = new EventEmitter<string>();

  public readonly searchControl = new FormControl();
  private _notDestroyed = true;

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        debounceTime(PropertyConstant.searchDebounceTime)
      )
      .subscribe(async (value) => {
        this.searchTextChange.emit(value);
      });
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

}
