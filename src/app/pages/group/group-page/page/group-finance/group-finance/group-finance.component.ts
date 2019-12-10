import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { SubgroupGroup } from 'app/data/remote/model/group/subgroup/subgroup/subgroup-group';
import {
  GroupApiService,
  SubgroupTemplateGroupApiService,
  SubgroupTemplateGroupVersionApiService
} from 'app/data/remote/rest-api/api';
import { GroupSubgroupsTreeComponent } from 'app/module/group/group-subgroups-tree/group-subgroups-tree/group-subgroups-tree.component';
import { SubgroupGroupReceiptComponent } from 'app/module/group/subgroup-group-receipt/subgroup-group-receipt/subgroup-group-receipt.component';
import { ContextMenuItem } from 'app/module/group/subgroups-trees/model/context-menu-item';
import { SubgroupsTreesComponent } from 'app/module/group/subgroups-trees/subgroups-trees/subgroups-trees.component';
import { FlatNode } from 'app/module/ngx/ngx-tree/model/flat-node';
import { SubgroupModalService } from 'app/pages/group/group-page/page/subgroups-page/service/subgroup-modal.service';
import { SubgroupService } from 'app/pages/group/group-page/page/subgroups-page/service/subgroup.service';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { AppHelper } from 'app/utils/app-helper';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-group-finance',
  templateUrl: './group-finance.component.html',
  styleUrls: ['./group-finance.component.scss']
})
export class GroupFinanceComponent extends GroupSubgroupsTreeComponent implements OnInit {

  @ViewChild(SubgroupsTreesComponent, {static: false})
  public subgroupsTreesComponent: SubgroupsTreesComponent;

  private _notDestroyed = true;
  private _canEdit: boolean;

  constructor(private _subgroupModalService: SubgroupModalService,
              private _appHelper: AppHelper,
              private _groupService: GroupService,
              private _subgroupService: SubgroupService,
              private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              _groupApiService: GroupApiService,
              _subgroupTemplateGroupApiService: SubgroupTemplateGroupApiService,
              _subgroupTemplateGroupVersionApiService: SubgroupTemplateGroupVersionApiService) {
    super(_subgroupTemplateGroupApiService, _groupApiService, _subgroupTemplateGroupVersionApiService);
  }

  public async ngOnInit(): Promise<void> {
    this._groupService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async val => {
        this.group = val;
        this._canEdit = await this._groupService.canEditGroup();
      });
  }

  public onGetNodeContextMenuItem = async (node: FlatNode): Promise<ContextMenuItem[]> => {
    if (!this._canEdit || !(node.data instanceof SubgroupGroup)) {
      return [];
    }

    return [{
      translation: 'select', action: async item => {
        const group = await this._appHelper.toPromise(this._groupService.group$);

        const modal = this._ngxModalService.open();
        modal.componentInstance.title = `Квитанции > ${(node.data as SubgroupGroup).subgroupVersion.name}`;
        await modal.componentInstance.initializeBody(SubgroupGroupReceiptComponent, async component => {
          component.group = group;
          component.subgroupGroup = node.data;
        }, {componentFactoryResolver: this._componentFactoryResolver});
      }
    }];
  };

}
