import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
import {IdentifiedObject} from '../../../data/remote/base/identified-object';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent extends BaseItemList<Dictionary, PageQuery> {

  @ViewChild(ItemListComponent)
  public itemListComponent: ItemListComponent<BaseParameter, ParameterQuery>;

  @Input()
  public filter: (values: BaseParameter[]) => BaseParameter[];

  @Output()
  public readonly clickItem = new EventEmitter<BaseParameter>();

  public readonly itemDisplayClass = ItemDisplay;
  private readonly _dictionaries: Dictionary[];

  constructor(private _parameterApiService: ParameterApiService,
              private _translateService: TranslateService,
              private _appHelper: AppHelper) {
    super();
    this.translationTitle = 'libraries';
    this.query = new PageQuery();
    this.canEdit = false;
    this.itemDisplay = ItemDisplay.GRID;

    this._dictionaries = [
      // new Dictionary(this._translateService.instant( 'controlTransferStandards'), data: 'stage-standard'},
      // new Dictionary(this._translateService.instant( 'sportsTrainingStage'), data: 'stage'},
      // new Dictionary(this._translateService.instant( 'stageType'), data: 'stage-type'},
      new Dictionary(this._translateService.instant('sportType'), 'sport-type'),
      // new Dictionary(this._translateService.instant( 'organizations'), data: 'organization'},
      // new Dictionary(this._translateService.instant( 'exercises'), data: 'exercise'},
      // new Dictionary(this._translateService.instant( 'tests'), data: 'test'},
      new Dictionary(this._translateService.instant('parameters'), 'parameter'),
      new Dictionary(this._translateService.instant('units'), 'unit'),
      new Dictionary(this._translateService.instant('devices'), 'device'),
      new Dictionary(this._translateService.instant('applications'), 'application'),
      new Dictionary(this._translateService.instant('polls'), 'poll')
    ];

    this.fetchItems = async (direction: Direction, query: PageQuery): Promise<PageContainer<Dictionary>> => {
      query.name = query.name ? query.name.toLowerCase() : '';
      return this._appHelper.arrayToPageContainer(this._dictionaries.filter(x => x.name.toLowerCase().indexOf(query.name) > -1));
    };
  }
}

class Dictionary extends IdentifiedObject {
  constructor(public name: string,
              public data: string) {
    super();
  }
}
