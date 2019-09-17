import { Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { BaseEditComponent } from '../../../../data/local/component/base/base-edit-component';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { Group } from '../../../../data/remote/model/group/base/group';
import { GroupTypeEnum } from '../../../../data/remote/model/group/base/group-type-enum';
import { Organization } from '../../../../data/remote/model/group/organization/organization';
import { OrganizationTypeEnum } from '../../../../data/remote/model/group/organization/organization-type-enum';
import { Team } from '../../../../data/remote/model/group/team/team';
import { UserRoleEnum } from '../../../../data/remote/model/user-role-enum';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { LocalStorageService } from '../../../../shared/local-storage.service';
import { PermissionService } from '../../../../shared/permission.service';
import { TranslateObjectService } from '../../../../shared/translate-object.service';
import { AppHelper } from '../../../../utils/app-helper';
import { NgxInput } from '../../../ngx/ngx-input/model/ngx-input';
import { NgxInputType } from '../../../ngx/ngx-input/model/ngx-input-type';
import { NgxSelect } from '../../../ngx/ngx-select/model/ngx-select';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent extends BaseEditComponent<Group> implements OnDestroy {

  public readonly groupTypeEnum = GroupTypeEnum;
  public readonly nameNgxInput = new NgxInput();
  public readonly descriptionNgxInput = new NgxInput();
  public readonly typeNgxSelect = new NgxSelect();
  public readonly organizationTypeNgxSelect = new NgxSelect();
  public readonly sportTypeNgxSelect = new NgxSelect();
  public readonly teamTypeNgxSelect = new NgxSelect();
  public readonly stageNgxSelect = new NgxSelect();
  public readonly stageYearNgxInput = new NgxInput();
  private _notDestroyed = true;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _router: Router,
              private _localStorageService: LocalStorageService,
              private _permissionService: PermissionService,
              private _translateObjectService: TranslateObjectService) {
    super(participantRestApiService, appHelper);
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

  protected async initializeComponent(data: Group): Promise<boolean> {
    await super.initializeComponent(data);
    data.visible = data.visible || true;

    return this.appHelper.tryLoad(async () => {
      this.nameNgxInput.labelTranslation = 'name';
      this.nameNgxInput.required = true;
      this.nameNgxInput.control.setValidators(Validators.required);
      this.nameNgxInput.control.setValue(data.name);

      this.descriptionNgxInput.labelTranslation = 'description';
      this.descriptionNgxInput.type = NgxInputType.TEXTAREA;
      this.descriptionNgxInput.control.setValue(data.description);

      this.typeNgxSelect.labelTranslation = 'type';
      this.typeNgxSelect.display = 'name';
      this.typeNgxSelect.required = true;
      this.typeNgxSelect.items = (await this._translateObjectService.getTranslatedEnumCollection<GroupTypeEnum>(GroupTypeEnum, 'GroupTypeEnum')).filter(x => x.data === GroupTypeEnum.ORGANIZATION);
      this.typeNgxSelect.control.setValidators(Validators.required);
      data.discriminator = data.discriminator || this.typeNgxSelect.items[0].data;
      this.typeNgxSelect.control.setValue(data.discriminator ? this.typeNgxSelect.items.find(x => x.data === data.discriminator) : this.typeNgxSelect.items[0].data);

      this.typeNgxSelect.control.valueChanges
        .pipe(takeWhile(() => this._notDestroyed))
        .subscribe(value => {
          this.data.discriminator = value.data;
        });

      let organizationTypes = await this.participantRestApiService.getOrganizationTypes();
      if (!await this._permissionService.hasAnyRole([UserRoleEnum.OPERATOR])) {
        organizationTypes = organizationTypes.filter(x =>
          x.organizationTypeEnum === OrganizationTypeEnum.SECTION ||
          x.organizationTypeEnum === OrganizationTypeEnum.CLUB ||
          x.organizationTypeEnum === OrganizationTypeEnum.OTHER
        );
      }

      this.organizationTypeNgxSelect.labelTranslation = 'organizationType';
      this.organizationTypeNgxSelect.display = 'name';
      this.organizationTypeNgxSelect.required = true;
      this.organizationTypeNgxSelect.items = organizationTypes;
      this.organizationTypeNgxSelect.control.setValidators(Validators.required);
      this.organizationTypeNgxSelect.control.setValue((data as Organization).organizationType ? this.organizationTypeNgxSelect.items.find(x => x.id == (data as Organization).organizationType.id) : this.organizationTypeNgxSelect.items[0]);

      this.sportTypeNgxSelect.labelTranslation = 'sportTypes';
      this.sportTypeNgxSelect.display = 'name';
      this.sportTypeNgxSelect.required = true;
      this.sportTypeNgxSelect.items = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;
      this.sportTypeNgxSelect.control.setValidators(Validators.required);
      this.sportTypeNgxSelect.control.setValue((data as Team).sportType ? this.sportTypeNgxSelect.items.find(x => x.id == (data as Team).sportType.id) : this.sportTypeNgxSelect.items[0]);

      this.teamTypeNgxSelect.labelTranslation = 'teamType';
      this.teamTypeNgxSelect.display = 'name';
      this.teamTypeNgxSelect.required = true;
      this.teamTypeNgxSelect.items = await this.participantRestApiService.getTeamTypes();
      this.teamTypeNgxSelect.control.setValidators(Validators.required);
      this.teamTypeNgxSelect.control.setValue((data as Team).teamType ? this.teamTypeNgxSelect.items.find(x => x.id == (data as Team).teamType.id) : this.teamTypeNgxSelect.items[0]);

      this.stageNgxSelect.labelTranslation = 'stages';
      this.stageNgxSelect.display = 'name';
      this.stageNgxSelect.required = true;
      this.stageNgxSelect.items = await this.participantRestApiService.getStages();
      this.stageNgxSelect.control.setValidators(Validators.required);
      this.stageNgxSelect.control.setValue((data as Team).stage ? this.stageNgxSelect.items.find(x => x.id == (data as Team).stage.id) : this.stageNgxSelect.items[0]);

      this.stageYearNgxInput.labelTranslation = 'yearPreparation';
      this.stageYearNgxInput.required = true;
      this.stageYearNgxInput.control.setValidators(Validators.required);
      this.stageYearNgxInput.control.setValue((data as Team).stageYear);
    });
  }

  public async onSave(): Promise<boolean> {
    this.data.name = this.nameNgxInput.control.value;
    this.data.description = this.descriptionNgxInput.control.value;
    this.data.discriminator = this.typeNgxSelect.control.value.data;
    (this.data as Organization).organizationType = this.organizationTypeNgxSelect.control.value;
    (this.data as Team).sportType = this.sportTypeNgxSelect.control.value;
    (this.data as Team).teamType = this.teamTypeNgxSelect.control.value;
    (this.data as Team).stage = this.stageNgxSelect.control.value;
    (this.data as Team).stageYear = this.stageYearNgxInput.control.value;

    return this.appHelper.trySave(async () => {
      const isNew = this.appHelper.isNewObject(this.data);
      if (isNew) {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.createGroup(this.data));
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.putGroup(this.data));
      }

      if (isNew) {
        await this.navigateToPage();
      }
    });
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async navigateToPage(): Promise<void> {
    await this._router.navigate(['/group', this.data.id]);
  }

}
