import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SubGroup} from '../../../../../data/remote/model/group/sub-group';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../../../group.service';
import {DxTextBoxComponent} from 'devextreme-angular';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss']
})
export class SubgroupComponent implements OnInit, AfterViewInit {

  @ViewChild(DxTextBoxComponent)
  public nameDxTextBoxComponent: DxTextBoxComponent;

  @Input()
  public subgroup: SubGroup;

  @Input()
  public remove: Function;

  public defaultName: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService) {
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

  public async onSave() {
    this.subgroup = await this._participantRestApiService.putSubgroup(this.subgroup, {}, {
      groupId: this.subgroup.group.id,
      subgroupId: this.subgroup.id
    });

    this.defaultName = this.subgroup.name;
    await this._groupService.updateSubgroups();
  }

  public async onRemove() {
    await this._participantRestApiService.deleteSubgroup({}, {}, {
      groupId: this.subgroup.group.id,
      subgroupId: this.subgroup.id
    });
    this.remove(this.subgroup);
    await this._groupService.updateSubgroups();
  }

}
