import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {BaseNews} from '../../../../data/remote/model/group/news/base-news';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {NewsType} from '../../../../data/remote/model/group/news/news-type';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {Validators} from '@angular/forms';
import {GroupApiService} from '../../../../data/remote/rest-api/api/group/group-api.service';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {GroupNews} from '../../../../data/remote/model/group/news/group-news';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent extends BaseEditComponent<BaseNews> {

  public readonly newsTypeClass = NewsType;
  public readonly newsTypeNgxSelect = new NgxSelect();
  public groupNgxSelect: NgxSelect;
  public titleNgxInput: NgxInput;

  constructor(private _personApiService: PersonApiService,
              private _groupApiService: GroupApiService,
              private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: BaseNews): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return this.appHelper.tryLoad(async () => {
        this.newsTypeNgxSelect.labelTranslation = 'newsType';
        this.newsTypeNgxSelect.display = 'name';
        this.newsTypeNgxSelect.required = true;
        this.newsTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<NewsType>(NewsType, 'NewsTypeEnum');
        this.newsTypeNgxSelect.control.setValidators([Validators.required]);
        this.newsTypeNgxSelect.control.setValue(this.newsTypeNgxSelect.items.find(x => x.discriminator === data.discriminator));

        if (this.isNew || data.discriminator === NewsType.GROUP_NEWS) {
          this.groupNgxSelect = new NgxSelect();
          this.groupNgxSelect.labelTranslation = 'groups';
          this.groupNgxSelect.display = 'name';
          this.groupNgxSelect.required = true;
          this.groupNgxSelect.compare = (first, second) => first.id == second.id;
          this.groupNgxSelect.items = (await this._groupApiService.getGroups({canEdit: true, count: PropertyConstant.pageSizeMax}).toPromise()).list;
          this.groupNgxSelect.control.setValidators([Validators.required]);
          this.groupNgxSelect.control.setValue((data as GroupNews).group);
        }

        if (!this.isNew || (data as GroupNews).group) {
          this.newsTypeNgxSelect.control.disable();
          this.newsTypeNgxSelect.control.setValue(this.newsTypeNgxSelect.items.find(x => x.data === data.discriminator));
          if (this.groupNgxSelect) {
            this.groupNgxSelect.control.setValue((data as GroupNews).group);
            this.groupNgxSelect.control.disable();
          }
        }

        this.titleNgxInput = new NgxInput();
        this.titleNgxInput.labelTranslation = 'title';
        this.titleNgxInput.required = true;
        this.titleNgxInput.control.setValidators([Validators.required]);
        this.titleNgxInput.control.setValue(data.title);
      });
    }
    return result;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      if (this.newsTypeNgxSelect.control.value.data === NewsType.GROUP_NEWS) {
        this.data = await this._groupApiService.removeGroupNews((this.data as GroupNews).group, this.data as GroupNews).toPromise();
      } else {
        this.data = await this._personApiService.removePersonNews(this.data).toPromise();
      }
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.discriminator = this.newsTypeNgxSelect.control.value.data;
      if (this.groupNgxSelect) {
        (this.data as GroupNews).group = this.groupNgxSelect.control.value;
      }
      this.data.title = this.titleNgxInput.control.value;

      if (this.newsTypeNgxSelect.control.value.data === NewsType.GROUP_NEWS) {
        this.data = await this._groupApiService.saveGroupNews((this.data as GroupNews).group, this.data as GroupNews).toPromise();
      } else {
        this.data = await this._personApiService.savePersonNews(this.data).toPromise();
      }
    });
  }

}
