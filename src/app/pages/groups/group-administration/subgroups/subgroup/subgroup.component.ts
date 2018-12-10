import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SubGroup} from '../../../../../data/remote/model/group/sub-group';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../../../../group/group-page/service/group.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {NgxButtonType} from '../../../../../components/ngx-button/model/ngx-button-type';
import {AppHelper} from '../../../../../utils/app-helper';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss']
})
export class SubgroupComponent implements OnInit, AfterViewInit {

  public readonly ngxButtonTypeClass = NgxButtonType;

  @ViewChild(DxTextBoxComponent)
  public nameDxTextBoxComponent: DxTextBoxComponent;

  @Input()
  public subgroup: SubGroup;

  @Input()
  public remove: Function;

  public defaultName: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _appHelper: AppHelper) {
  }

  ngOnInit() {
    this.defaultName = this.subgroup.name;
  }

  ngAfterViewInit(): void {
    this.nameDxTextBoxComponent.textChange
      .subscribe(async value => {
        this.subgroup.name = value;
      });
  }

  public onSave = async () => {
    await this._appHelper.trySave(async () => {
      this.subgroup = await this._participantRestApiService.putSubgroup(this.subgroup, {}, {
        groupId: this.subgroup.group.id,
        subgroupId: this.subgroup.id
      });

      this.defaultName = this.subgroup.name;
      await this._groupService.updateSubgroups();
    });
  };

  public onRemove = async () => {
    await this._appHelper.tryRemove(async () => {
      await this._participantRestApiService.deleteSubgroup({}, {}, {
        groupId: this.subgroup.group.id,
        subgroupId: this.subgroup.id
      });
      this.remove(this.subgroup);
      await this._groupService.updateSubgroups();
    });
  };

}
