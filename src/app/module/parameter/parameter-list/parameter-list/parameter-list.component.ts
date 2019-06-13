import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {BaseParameter} from '../../../../data/remote/model/parameter/base-parameter';
import {ParameterApiService} from '../../../../data/remote/rest-api/api/parameter/parameter-api.service';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {UnitQuery} from '../../../../data/remote/rest-api/query/unit/unit-query';
import {AppHelper} from '../../../../utils/app-helper';
import {debounceTime, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ParameterWindowService} from '../../../../services/windows/parameter-window/parameter-window.service';
import {ParameterQuery} from '../../../../data/remote/rest-api/query/parameter/parameter-query';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss'],
  providers: [ParameterApiService]
})
export class ParameterListComponent implements OnInit, OnDestroy {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public canEdit: boolean;

  public readonly searchNgxInput = new NgxInput();
  public query: ParameterQuery;
  private _notDestroyed = true;

  constructor(private _parameterApiService: ParameterApiService,
              private _appHelper: AppHelper,
              private _parameterWindowService: ParameterWindowService) {
    this.query = new UnitQuery();
    this.searchNgxInput.labelTranslation = 'search';
    this.searchNgxInput.control.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        debounceTime(PropertyConstant.searchDebounceTime)
      )
      .subscribe(async (value) => {
        this.query.name = value;
        await this._updateItems();
      });
  }

  async ngOnInit() {
    await this._updateItems();
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
  }

  public async onAddItem(): Promise<void> {
    const dialogResult = await this._parameterWindowService.openEditParameter(new BaseParameter());
    if (dialogResult.result) {
      const itemIndex = this.ngxVirtualScrollComponent.items.findIndex(value => value.id == dialogResult.data.id);
      if (itemIndex > -1) {
        if (dialogResult.data.deleted) {
          this.ngxVirtualScrollComponent.items.splice(itemIndex, 1);
        } else {
          this.ngxVirtualScrollComponent.items[itemIndex] = dialogResult.data;
        }
      } else if (!dialogResult.data.deleted) {
        this.ngxVirtualScrollComponent.items.push(dialogResult.data);
      }
    }
  }

  public fetchItems = async (direction: Direction, query: ParameterQuery) => {
    return await this._parameterApiService.getParameters(query).toPromise();
  };

  private async _updateItems(): Promise<void> {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
