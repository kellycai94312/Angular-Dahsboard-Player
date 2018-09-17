import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DictionaryType} from '../../../data/remote/misc/dictionary-type';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {AuthorizationService} from '../../../shared/authorization.service';

@Component({
  selector: 'app-dictionary-type',
  templateUrl: './dictionary-type.component.html',
  styleUrls: ['./dictionary-type.component.scss']
})
export class DictionaryTypeComponent implements OnInit {

  public canEdit: boolean;
  public dictionaryTypes: NameWrapper<DictionaryType>[];
  public selectedDictionaryType: NameWrapper<DictionaryType>;

  @Input()
  public class: string;

  private _dictionaryType: DictionaryType;

  @Input()
  get dictionaryType(): DictionaryType {
    return this._dictionaryType;
  }

  set dictionaryType(value: DictionaryType) {
    this._dictionaryType = value;
    this.dictionaryTypeChange.emit(value);
  }

  @Output()
  public readonly dictionaryTypeChange: EventEmitter<DictionaryType>;

  constructor(private _translateObjectService: TranslateObjectService,
              private _authorizationService: AuthorizationService) {
    this.dictionaryTypeChange = new EventEmitter<DictionaryType>();
  }

  async ngOnInit(): Promise<void> {
    this.dictionaryTypes = await this._translateObjectService.getTranslatedEnumCollection<DictionaryType>(DictionaryType, 'DictionaryTypeEnum');
    this.dictionaryType = this._dictionaryType || DictionaryType.USER;
    this.selectedDictionaryType = this.dictionaryTypes.find(x => x.data === this.dictionaryType);

    this.canEdit = await this._authorizationService.hasUserRole(UserRoleEnum.ADMIN);
  }

  public onValueChange(value: NameWrapper<DictionaryType>) {
    this.dictionaryType = value.data;
  }

}
