import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {BaseItemList} from '../../../module/common/item-list/model/base-item-list';
import {BaseParameter} from '../../../data/remote/model/parameter/base-parameter';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {ItemListComponent} from '../../../module/common/item-list/item-list/item-list.component';
import {ParameterQuery} from '../../../data/remote/rest-api/query/parameter/parameter-query';
import {ParameterApiService} from '../../../data/remote/rest-api/api/parameter/parameter-api.service';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {AppHelper} from '../../../utils/app-helper';
import {ItemDisplay} from '../../../module/common/item-list/model/item-display';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent extends BaseItemList<NameWrapper<string>, PageQuery> {

  @ViewChild(ItemListComponent)
  public itemListComponent: ItemListComponent<BaseParameter, ParameterQuery>;

  @Input()
  public filter: (values: BaseParameter[]) => BaseParameter[];

  @Output()
  public readonly clickItem = new EventEmitter<BaseParameter>();

  public readonly itemDisplayClass = ItemDisplay;
  private readonly _dictionaries: NameWrapper<string>[];

  constructor(private _parameterApiService: ParameterApiService,
              private _translateService: TranslateService,
              private _appHelper: AppHelper) {
    super();
    this.translationTitle = 'libraries';
    this.query = new PageQuery();
    this.canEdit = false;
    this.itemDisplay = ItemDisplay.GRID;

    this._dictionaries = [
      // {name:this._translateService.instant( 'controlTransferStandards'), data: 'stage-standard'},
      // {name:this._translateService.instant( 'sportsTrainingStage'), data: 'stage'},
      // {name:this._translateService.instant( 'stageType'), data: 'stage-type'},
      {name: this._translateService.instant('sportType'), data: 'sport-type'},
      // {name:this._translateService.instant( 'organizations'), data: 'organization'},
      // {name:this._translateService.instant( 'exercises'), data: 'exercise'},
      // {name:this._translateService.instant( 'tests'), data: 'test'},
      {name: this._translateService.instant('parameters'), data: 'parameter'},
      {name: this._translateService.instant('units'), data: 'unit'},
      {name: this._translateService.instant('devices'), data: 'device'}
    ];

    this.fetchItems = async (direction: Direction, query: PageQuery): Promise<PageContainer<NameWrapper<string>>> => {
      return this._appHelper.arrayToPageContainer(this._dictionaries.filter(x => x.name.indexOf(query.name || '') > -1));
    };
  }
}
