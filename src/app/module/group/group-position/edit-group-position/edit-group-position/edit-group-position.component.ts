import {Component, Input} from '@angular/core';
import {BaseEditComponent} from '../../../../../data/local/component/base/base-edit-component';
import {GroupPosition} from '../../../../../data/remote/model/person-position/group-position';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../utils/app-helper';
import {GroupApiService} from '../../../../../data/remote/rest-api/api/group/group-api.service';
import {PositionApiService} from '../../../../../data/remote/rest-api/api/position/position-api.service';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {Position} from '../../../../../data/remote/model/person-position/position';
import {NgxSelect} from '../../../../ngx/ngx-select/model/ngx-select';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-group-position',
  templateUrl: './edit-group-position.component.html',
  styleUrls: ['./edit-group-position.component.scss']
})
export class EditGroupPositionComponent extends BaseEditComponent<GroupPosition> {

  @Input()
  public group: Group;

  public positionNgxSelect: NgxSelect;

  constructor(private _groupApiService: GroupApiService,
              private _positionApiService: PositionApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: GroupPosition): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        const positions = (await this._positionApiService.getPositions({count: PropertyConstant.pageSizeMax}).toPromise()).list;

        this.positionNgxSelect = new NgxSelect();
        this.positionNgxSelect.labelTranslation = 'personPosition';
        this.positionNgxSelect.required = true;
        this.positionNgxSelect.display = (item: Position) => `${item.name} (${item.activity.name})`;
        this.positionNgxSelect.items = positions;
        this.positionNgxSelect.control.setValidators(Validators.required);
        this.positionNgxSelect.control.setValue(data.relevantPosition ? this.positionNgxSelect.items.find(x => x.id == data.relevantPosition.id) : void 0);

        if (!this.isNew) {
          this.positionNgxSelect.control.disable();
        }
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._groupApiService.removeGroupPosition(this.group, this.data).toPromise();
    });
  }

  public async onSave(): Promise<boolean> {
    this.data.relevantPosition = this.positionNgxSelect.control.value;
    return await this.appHelper.trySave(async () => {
      this.data = await this._groupApiService.saveGroupPosition(this.group, this.data).toPromise();
    });
  }

}
