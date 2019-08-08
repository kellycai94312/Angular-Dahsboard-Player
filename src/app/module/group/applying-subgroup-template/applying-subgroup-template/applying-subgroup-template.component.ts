import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {SubgroupTemplate} from '../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {SubgroupTemplateApiService} from '../../../../data/remote/rest-api/api/subgroup-template/subgroup-template-api.service';
import {SubgroupTemplateGroup} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-group';

@Component({
  selector: 'app-applying-subgroup-template',
  templateUrl: './applying-subgroup-template.component.html',
  styleUrls: ['./applying-subgroup-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyingSubgroupTemplateComponent extends BaseComponent<Group> implements OnInit {

  @Input()
  public subgroupTemplate: SubgroupTemplate;

  public subgroupTemplateGroups: SubgroupTemplateGroup[] = [];

  constructor(private _subgroupTemplateApiService: SubgroupTemplateApiService,
              private _changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this._subgroupTemplateApiService.getSubgroupTemplateGroups(this.subgroupTemplate).subscribe(value => {
      this.subgroupTemplateGroups = value;
      this._changeDetectorRef.markForCheck();
    });
  }

  public getSubgroupTemplateGroup(group: Group): SubgroupTemplateGroup {
    return this.subgroupTemplateGroups.find(x => x.group.id == group.id);
  }

  public onEdit(group: Group): void {
    let subgroupTemplateGroup = this.getSubgroupTemplateGroup(group);
    if (subgroupTemplateGroup) {
      this._subgroupTemplateApiService.removeSubgroupTemplateGroupByTemplateOwner(this.subgroupTemplate, subgroupTemplateGroup).subscribe(value => {
        this.subgroupTemplateGroups.splice(this.subgroupTemplateGroups.findIndex(x => x.id == value.id), 1);
        this._changeDetectorRef.markForCheck();
      });
    } else {
      subgroupTemplateGroup = new SubgroupTemplateGroup();
      subgroupTemplateGroup.group = group;
      this._subgroupTemplateApiService.createSubgroupTemplateGroup(this.subgroupTemplate, subgroupTemplateGroup).subscribe(value => {
        this.subgroupTemplateGroups.push(value);
        this._changeDetectorRef.markForCheck();
      });
    }
  }

}
