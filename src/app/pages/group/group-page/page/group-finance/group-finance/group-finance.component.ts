import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { PropertyConstant } from 'app/data/local/property-constant';
import { Group } from 'app/data/remote/model/group/base';
import { SubgroupGroup } from 'app/data/remote/model/group/subgroup/subgroup/subgroup-group';
import { SubgroupTemplate } from 'app/data/remote/model/group/subgroup/template/subgroup-template';
import {
  GroupApiService,
  SubgroupTemplateGroupApiService,
  SubgroupTemplateGroupVersionApiService
} from 'app/data/remote/rest-api/api';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { ContextMenuItem } from 'app/module/group/subgroups-trees/model/context-menu-item';
import { SubgroupsTreesComponent } from 'app/module/group/subgroups-trees/subgroups-trees/subgroups-trees.component';
import { FlatNode } from 'app/module/ngx/ngx-tree/model/flat-node';
import { RootSubgroupGroup } from 'app/pages/group/group-page/page/subgroups-page/page/structure-subgroups-page/model/root-subgroup-group';
import { RootSubgroup } from 'app/pages/group/group-page/page/subgroups-page/page/templates-subgroups-page/model/root-subgroup';
import { SubgroupModalService } from 'app/pages/group/group-page/page/subgroups-page/service/subgroup-modal.service';
import { SubgroupService } from 'app/pages/group/group-page/page/subgroups-page/service/subgroup.service';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { GroupWindowService } from 'app/services/windows/group-window/group-window.service';
import { TranslateObjectService } from 'app/shared/translate-object.service';
import { AppHelper } from 'app/utils/app-helper';
import { from, Observable, of } from 'rxjs';
import { distinctUntilChanged, flatMap, map, skipWhile, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-group-finance',
  templateUrl: './group-finance.component.html',
  styleUrls: ['./group-finance.component.scss']
})
export class GroupFinanceComponent implements OnInit {

  @ViewChild(SubgroupsTreesComponent, {static: false})
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  public group: Group;
  private _notDestroyed = true;
  private _canEdit: boolean;
  private _rootSubgroupName: string;

  constructor(private _subgroupModalService: SubgroupModalService,
              private _appHelper: AppHelper,
              private _groupApiService: GroupApiService,
              private _groupService: GroupService,
              private _groupWindowService: GroupWindowService,
              private _subgroupService: SubgroupService,
              private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService,
              private _subgroupTemplateGroupApiService: SubgroupTemplateGroupApiService,
              private _subgroupTemplateGroupVersionApiService: SubgroupTemplateGroupVersionApiService) {
    this._groupService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async val => {
        this.group = val;
        this._canEdit = await this._groupService.canShowTemplatesSubgroups();
      });
    this._subgroupService.subgroupTemplateChanged()
      .pipe(
        takeWhile(() => this._notDestroyed),
        skipWhile(() => !this.subgroupsTreesComponent),
        distinctUntilChanged()
      )
      .subscribe((val: SubgroupTemplate) => {
        const dataSource = this.subgroupsTreesComponent.dataSource;
        const rootSubgroupCompare: <T extends RootSubgroup>(source: T, target: T) => boolean = (source, target) => {
          return source instanceof RootSubgroup && source.subgroupTemplate.id == target.subgroupTemplate.id;
        };

        const rootSubgroup = new RootSubgroup(val, void 0, void 0);
        if (val.deleted) {
          dataSource.removeNodeByData(rootSubgroup, rootSubgroupCompare);
        } else {
          const node = dataSource.getNodeByData(rootSubgroup, rootSubgroupCompare);
          if (node) {
            dataSource.addOrUpdateNodeIfCan(rootSubgroup, rootSubgroupCompare);
          } else {
            // TODO: Updating only edited item without refresh all items!
            dataSource.refreshNodesOnLevel(void 0);
          }
        }
      });
  }

  public async ngOnInit(): Promise<void> {
    this._rootSubgroupName = await this._translateObjectService.getTranslation('rootSubgroup');
  }

  public getChildren = (node: FlatNode | any): Observable<FlatNode[]> => {
    let nextLevel = 1;
    if (node) {
      nextLevel = (node.level || 0) + 1;
    }
    if (!node || node.data instanceof Group) {
      return this._groupApiService.getSubgroupTemplateGroups(this.group, {count: PropertyConstant.pageSizeMax})
        .pipe(
          map(val => val.list),
          flatMap(async subgroupTemplateGroups => {
            const nodes: FlatNode[] = [];
            for (const subgroupTemplateGroup of subgroupTemplateGroups) {
              const subgroupTemplateGroupVersions = await this._participantRestApiService.getSubgroupTemplateGroupVersions({subgroupTemplateGroupId: subgroupTemplateGroup.id});
              for (const subgroupTemplateGroupVersion of subgroupTemplateGroupVersions) {
                const subgroupGroups = await this._participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {}, {subgroupTemplateGroupVersionId: subgroupTemplateGroupVersion.id});
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
      return from(this._participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {subgroupGroupId: node.data.defaultSubgroupGroup.id}, {subgroupTemplateGroupVersionId: node.data.defaultSubgroupGroup.subgroupTemplateGroupVersion.id}))
        .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
    } else if (node.data instanceof SubgroupGroup) {
      return from(this._participantRestApiService.getSubgroupTemplateGroupChildrenSubgroupGroups({}, {subgroupGroupId: node.data.id}, {subgroupTemplateGroupVersionId: node.data.subgroupTemplateGroupVersion.id}))
        .pipe(map(val => val.map(x => new FlatNode(x, nextLevel, true))));
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

  public onGetNodeContextMenuItem = async (node: FlatNode): Promise<ContextMenuItem[]> => {
    if (!this._canEdit) {
      return [];
    }

    return [{
      translation: 'select', action: async item => {
        const group = await this._appHelper.toPromise(this._groupService.group$);
        const dialogResult = await this._subgroupModalService.showEditSubgroupTemplate(group, node.data.subgroupTemplate);
        if (dialogResult.result) {
          this._subgroupService.updateSubgroupTemplate(dialogResult.data);
        }
      }
    }];
  };

}
