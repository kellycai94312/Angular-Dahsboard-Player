import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Person} from '../../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {GroupApiService} from '../../../../data/remote/rest-api/api/group/group-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {FormGroup, Validators} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {Position} from '../../../../data/remote/model/person-position/position';
import {PositionType} from '../../../../data/remote/model/person-position/position-type';
import {GroupPosition} from '../../../../data/remote/model/person-position/group-position';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {GroupPersonJob} from '../../../../data/remote/model/group/group-person-job';
import {Group} from '../../../../data/remote/model/group/base/group';
import {BasePosition} from '../../../../data/remote/model/person-position/base-position';
import {PersonPrivacyEnum} from '../../../../data/remote/model/base/person-privacy-enum';

@Component({
  selector: 'app-career-person',
  templateUrl: './career-person.component.html',
  styleUrls: ['./career-person.component.scss']
})
export class CareerPersonComponent extends BaseEditComponent<Person> implements OnInit, OnDestroy {

  @Input()
  public canEdit: boolean;

  public readonly formGroup = new FormGroup({});
  public groupNgxSelect: NgxSelect<Group>;
  public positionNgxSelect: NgxSelect<BasePosition>;
  private _groupPersonJob: GroupPersonJob;
  private _notDestroyed = true;

  constructor(private _groupApiService: GroupApiService,
              private _personApiService: PersonApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  protected async initializeComponent(data: Person): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return this.appHelper.tryLoad(async () => {
        this._groupPersonJob = await this._personApiService.getGroupPersonJob(data).toPromise();

        this.groupNgxSelect = new NgxSelect<Group>();
        this.groupNgxSelect.labelTranslation = 'group';
        this.groupNgxSelect.display = 'name';
        this.groupNgxSelect.required = true;
        this.groupNgxSelect.compare = (first, second) => first.id == second.id;
        this.groupNgxSelect.items = (await this._groupApiService.getGroups({count: PropertyConstant.pageSizeMax, all: false}).toPromise()).list;
        this.groupNgxSelect.control.setValidators(Validators.required);

        this.positionNgxSelect = new NgxSelect<BasePosition>();
        this.positionNgxSelect.labelTranslation = 'personPosition';
        this.positionNgxSelect.required = true;
        this.positionNgxSelect.compare = (first, second) => first.id == second.id;
        this.positionNgxSelect.control.disable();
        this.positionNgxSelect.control.setValidators(Validators.required);
        this.positionNgxSelect.display = item => {
          let name: string;
          let position: Position;
          if (item.discriminator === PositionType.GROUP_POSITION) {
            name = (item as GroupPosition).name;
            position = (item as GroupPosition).relevantPosition;
          } else {
            name = (item as any as Position).name;
            position = item as any as Position;
          }
          return `${name} (${position.activity.name})`;
        };

        if (this._groupPersonJob) {
          this.groupNgxSelect.control.setValue(this._groupPersonJob.group);
          await this._updatePositions(this.groupNgxSelect.control.value);
          this.positionNgxSelect.control.setValue(this._groupPersonJob.position);
        }

        this.formGroup.setControl('group', this.groupNgxSelect.control);
        this.formGroup.setControl('position', this.positionNgxSelect.control);

        this.groupNgxSelect.control.valueChanges
          .pipe(takeWhile(() => this._notDestroyed))
          .subscribe(async (group) => {
            await this._updatePositions(group);
          });
      });
    }
    return result;
  }

  private async _updatePositions(group: Group): Promise<void> {
    this.positionNgxSelect.items = (await this._groupApiService.getGroupPersonPositions({group, person: this.data} as any, {count: PropertyConstant.pageSizeMax}).toPromise())
      .list.map(x => x.position);
    this.positionNgxSelect.control.enable();
  }

  public async onRemove(): Promise<boolean> {
    return this.appHelper.tryRemove(async () => {
      await this._personApiService.removeGroupPersonJob(this.data).toPromise();
      delete this._groupPersonJob;
      this.formGroup.reset();
    });
  }

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      this._groupPersonJob = this._groupPersonJob || new GroupPersonJob();
      this._groupPersonJob.personPrivacyEnum = this._groupPersonJob.personPrivacyEnum || PersonPrivacyEnum.PUBLIC;

      this._groupPersonJob.group = this.groupNgxSelect.control.value;
      this._groupPersonJob.position = this.positionNgxSelect.control.value;

      this._groupPersonJob = await this._personApiService.updateGroupPersonJob(this.data, this._groupPersonJob).toPromise();
    });
  }

}
