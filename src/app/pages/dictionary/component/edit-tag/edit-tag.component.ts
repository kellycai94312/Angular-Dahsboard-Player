import {Component, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Tag} from '../../../../data/remote/model/tag';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {DictionaryType} from '../../../../data/remote/misc/dictionary-type';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss']
})
export class EditTagComponent extends BaseEditComponent<Tag> implements OnInit {

  public canEditDictionaryType: boolean;
  public dictionaryTypes: NameWrapper<DictionaryType>[];
  public selectedDictionaryType: NameWrapper<DictionaryType>;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService,
              private _authorizationService: AuthorizationService) {
    super(participantRestApiService, appHelper);
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.dictionaryTypes = await this._translateObjectService.getTranslatedEnumCollection<DictionaryType>(DictionaryType, 'DictionaryTypeEnum');
    let dictionaryType = DictionaryType.USER;
    if (this.data && this.data.dictionaryType) {
      dictionaryType = this.data.dictionaryType;
    }
    this.selectedDictionaryType = this.dictionaryTypes.find(x => x.data === dictionaryType);

    this.canEditDictionaryType = await this._authorizationService.hasUserRole(UserRoleEnum.ADMIN);
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.dictionaryType = this.selectedDictionaryType.data;

      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createTag(this.data);
      } else {
        this.data = await this.participantRestApiService.updateTag(this.data, {}, {tagId: this.data.id});
      }
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this.participantRestApiService.removeTag({tagId: this.data.id});
    });
  }

}
