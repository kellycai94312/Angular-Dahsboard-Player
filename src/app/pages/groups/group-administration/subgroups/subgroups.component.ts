import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupService} from '../../group.service';
import {SubGroup} from '../../../../data/remote/model/group/sub-group';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {DxTextBoxComponent} from 'devextreme-angular';

@Component({
  selector: 'app-subgroups',
  templateUrl: './subgroups.component.html',
  styleUrls: ['./subgroups.component.scss']
})
export class SubgroupsComponent implements OnInit, AfterViewInit {

  @ViewChild(DxTextBoxComponent)
  public nameDxTextBoxComponent: DxTextBoxComponent;

  public subgroups: SubGroup[];
  public name: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _appHelper: AppHelper) {
    this.name = '';
  }

  async ngOnInit() {
    this.subgroups = await this._participantRestApiService.getSubGroupsByGroup({id: this._groupService.getGroup().id});
  }

  ngAfterViewInit(): void {
    this.nameDxTextBoxComponent.textChange
      .subscribe(async value => {
        this.name = value;
      });
  }

  public async onAdd() {
    let subgroup = new SubGroup();
    subgroup.name = this.name.trim();
    subgroup = await this._participantRestApiService.postSubgroup(subgroup, {}, {groupId: this._groupService.getGroup().id});
    this.subgroups.push(subgroup);
    await this._groupService.updateSubgroups();

    this.name = '';
  }

  onRemove = (subgroup: SubGroup) => {
    this._appHelper.removeItem(this.subgroups, subgroup);
  };

}
