import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyConstant } from 'app/data/local/property-constant';
import { Group } from 'app/data/remote/model/group/base';
import { SubgroupGroup } from 'app/data/remote/model/group/subgroup/subgroup/subgroup-group';
import {
  GroupApiService,
  SubgroupTemplateGroupApiService,
  SubgroupTemplateGroupVersionApiService
} from 'app/data/remote/rest-api/api';
import { FlatNode } from 'app/module/ngx/ngx-tree/model/flat-node';
import { RootSubgroupGroup } from 'app/pages/group/group-page/page/subgroups-page/page/structure-subgroups-page/model/root-subgroup-group';
import { plainToClass } from 'class-transformer';
import { from, Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-group-subgroups-tree',
  templateUrl: './group-subgroups-tree.component.html',
  styleUrls: ['./group-subgroups-tree.component.scss']
})
export class GroupSubgroupsTreeComponent {

  @Input()
  public group: Group;

  @Output()
  public readonly selectedNodeChange = new EventEmitter<FlatNode>();

  public selectedNode: FlatNode;

  constructor(private _subgroupTemplateGroupApiService: SubgroupTemplateGroupApiService,
              private _groupApiService: GroupApiService,
              private _subgroupTemplateGroupVersionApiService: SubgroupTemplateGroupVersionApiService) {
  }

  public getChildren = (node: FlatNode | any): Observable<FlatNode[]> => {
    if (node) {
      const nextLevel = (node.level || 0) + 1;
      if (node.data instanceof Group) {
        return this._groupApiService.getSubgroupTemplateGroups(this.group, {count: PropertyConstant.pageSizeMax})
          .pipe(
            map(val => val.list),
            flatMap(async subgroupTemplateGroups => {
              const nodes: FlatNode[] = [];
              for (const subgroupTemplateGroup of subgroupTemplateGroups) {
                const subgroupTemplateGroupVersions = await this._subgroupTemplateGroupApiService.getSubgroupTemplateGroupVersions(subgroupTemplateGroup).toPromise();
                for (const subgroupTemplateGroupVersion of subgroupTemplateGroupVersions) {
                  const subgroupGroups = await this._subgroupTemplateGroupVersionApiService.getSubgroupTemplateGroupChildrenSubgroupGroups(subgroupTemplateGroupVersion).toPromise();
                  for (const subgroupGroup of subgroupGroups) {
                    const rootSubgroup = new RootSubgroupGroup(subgroupTemplateGroup, subgroupTemplateGroupVersion, subgroupGroup);
                    nodes.push(new FlatNode(rootSubgroup, nextLevel, true));
                  }
                }
              }
              return nodes;
            })
          );
      } else if (node.data instanceof RootSubgroupGroup) {
        return from(this._subgroupTemplateGroupVersionApiService.getSubgroupTemplateGroupChildrenSubgroupGroups(node.data.defaultSubgroupGroup.subgroupTemplateGroupVersion, {subgroupGroupId: node.data.defaultSubgroupGroup.id}))
          .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
      } else if (node.data instanceof SubgroupGroup) {
        return from(this._subgroupTemplateGroupVersionApiService.getSubgroupTemplateGroupChildrenSubgroupGroups(node.data.subgroupTemplateGroupVersion, {subgroupGroupId: node.data.id}))
          .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
      }
    } else {
      return of([new FlatNode(plainToClass(Group, this.group), 0, true)]);
    }
  };

  public getNodeName = (node: FlatNode): string => {
    if (node.data instanceof Group) {
      return node.data.name;
    } else if (node.data instanceof RootSubgroupGroup) {
      let name = node.data.subgroupTemplateGroupVersion.template.name;
      name += '\r\n';
      if (node.data.subgroupTemplateGroupVersion.applied) {
        name += `(Подтвержденная версия ${node.data.subgroupTemplateGroupVersion.templateVersion.versionNumber})`;
      } else {
        name += `(Неподтвержденная версия ${node.data.subgroupTemplateGroupVersion.templateVersion.versionNumber})`;
      }
      return name;
    } else if (node.data instanceof SubgroupGroup) {
      return node.data.subgroupVersion.name;
    }
  };

  public onSelectedNode(node: FlatNode): void {
    this.selectedNode = node;
    this.selectedNodeChange.emit(node);
  }

}
