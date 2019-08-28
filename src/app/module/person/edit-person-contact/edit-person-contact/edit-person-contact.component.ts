import {Component, Input} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {PersonContact} from '../../../../data/remote/model/person/person-contact';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {Person} from '../../../../data/remote/model/person';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {PersonPrivacyEnum} from '../../../../data/remote/model/base/person-privacy-enum';
import {FormGroup, Validators} from '@angular/forms';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {PersonContactTypeEnum} from '../../../../data/remote/model/person/person-contact-type-enum';

@Component({
  selector: 'app-edit-person-contact',
  templateUrl: './edit-person-contact.component.html',
  styleUrls: ['./edit-person-contact.component.scss']
})
export class EditPersonContactComponent extends BaseEditComponent<PersonContact> {

  @Input()
  public person: Person;

  public readonly formGroup = new FormGroup({});
  public personContactTypeNgxSelect: NgxSelect<NameWrapper<PersonContactTypeEnum>>;
  public valueNgxInput: NgxInput;
  public privacyNgxSelect: NgxSelect<NameWrapper<PersonPrivacyEnum>>;

  constructor(private _personApiService: PersonApiService,
              private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: PersonContact): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return this.appHelper.tryLoad(async () => {
        this.personContactTypeNgxSelect = this._getNgxInputInstance('contactType', () => new NgxSelect<NameWrapper<PersonContactTypeEnum>>());
        this.personContactTypeNgxSelect.display = 'name';
        this.personContactTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<PersonContactTypeEnum>(PersonContactTypeEnum, 'PersonContactTypeEnum');
        this.personContactTypeNgxSelect.control.setValue(this.personContactTypeNgxSelect.items.find(x => x.data === data.personContactTypeEnum) || this.personContactTypeNgxSelect.items[0]);

        this.valueNgxInput = this._getNgxInputInstance('value');
        this.valueNgxInput.control.setValue(data.value);

        this.privacyNgxSelect = this._getNgxInputInstance('privacy', () => new NgxSelect<NameWrapper<PersonPrivacyEnum>>());
        this.privacyNgxSelect.display = 'name';
        this.privacyNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<PersonPrivacyEnum>(PersonPrivacyEnum, 'PersonPrivacyEnum');
        this.privacyNgxSelect.control.setValue(this.privacyNgxSelect.items.find(x => x.data === data.personPrivacyEnum) || this.privacyNgxSelect.items[0]);

        this.formGroup.setControl('contactType', this.personContactTypeNgxSelect.control);
        this.formGroup.setControl('value', this.valueNgxInput.control);
        this.formGroup.setControl('privacy', this.privacyNgxSelect.control);
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._personApiService.removeContact(this.person, this.data).toPromise();
    });
  }

  public async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.personContactTypeEnum = this.personContactTypeNgxSelect.control.value.data;
      this.data.value = this.valueNgxInput.control.value;
      this.data.personPrivacyEnum = this.privacyNgxSelect.control.value.data;

      this.data = await this._personApiService.saveContact(this.person, this.data).toPromise();
    });
  }

  private _getNgxInputInstance<T extends NgxInput | NgxSelect>(labelTranslation: string, getConstructor: () => T = () => new NgxInput() as T): T {
    const ngxInput = getConstructor();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.required = true;
    ngxInput.control.setValidators(Validators.required);
    return ngxInput as T;
  }

}
