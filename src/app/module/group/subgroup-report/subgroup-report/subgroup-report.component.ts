import {Component, ComponentFactoryResolver, Input, OnInit} from '@angular/core';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {Group} from '../../../../data/remote/model/group/base/group';
import {PositionLevelEnum} from '../../../../data/remote/model/person-position/position-level-enum';
import {filter, flatMap, map, takeWhile} from 'rxjs/operators';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {PositionApiService} from '../../../../data/remote/rest-api/api/position/position-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NodeConfiguration} from '../../../ngx/ngx-tree/model/node-configuration';
import {FlatNode} from '../../../ngx/ngx-tree/model/flat-node';
import {DynamicDataSource} from '../../../ngx/ngx-tree/utils/dynamic-data-source';
import {SubgroupTemplateApiService} from '../../../../data/remote/rest-api/api/subgroup-template/subgroup-template-api.service';
import {SubgroupTemplate} from '../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {SubgroupTemplateGroupVersionApiService} from '../../../../data/remote/rest-api/api/subgroup-template-group-version/subgroup-template-group-version-api.service';
import {SubgroupTemplateGroup} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-group';
import {SubgroupTemplateGroupApiService} from '../../../../data/remote/rest-api/api/subgroup-template-group/subgroup-template-group-api.service';
import {SubgroupTemplateGroupVersion} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-group-version';
import {SubgroupGroup} from '../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {SubgroupTemplateGroupVersionPersonPosition} from '../../../../data/remote/bean/subgroup-template-group-version-person-position';
import {SubgroupTemplateGroupVersionQuery} from '../../../../data/remote/rest-api/api/subgroup-template-group-version/model/subgroup-template-group-version-query';
import {RootSubgroupGroup} from '../../../../pages/group/group-page/page/subgroups-page/page/structure-subgroups-page/model/root-subgroup-group';
import {from} from 'rxjs';
import {SubgroupVersion} from '../../../../data/remote/model/group/subgroup/version/subgroup-version';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {SubgroupGroupReceiptComponent} from '../../subgroup-group-receipt/subgroup-group-receipt/subgroup-group-receipt.component';
import {SubgroupGroupAttendanceReportComponent} from '../../report/subgroup-group-attendance-report/subgroup-group-attendance-report/subgroup-group-attendance-report.component';

@Component({
  selector: 'app-subgroup-report',
  templateUrl: './subgroup-report.component.html',
  styleUrls: ['./subgroup-report.component.scss']
})
export class SubgroupReportComponent implements OnInit {

  @Input()
  public subgroupTemplate: SubgroupTemplate;

  @Input()
  public group: Group;

  public readonly nodeConfigurations = [
    new NodeConfiguration('leaf'),
    new NodeConfiguration('nested', (index, nodeData: FlatNode) => {
      return nodeData.expandable;
    })
  ];
  public dataSource: DynamicDataSource<FlatNode>;
  public selectedNode: FlatNode;
  public positionLevelNgxSelect: NgxSelect;
  public positionNgxSelect: NgxSelect;
  public rankNgxSelect: NgxSelect;
  public byName: boolean;
  public tableData: SubgroupTemplateGroupVersionPersonPosition[] = [];
  private _notDestroyed = true;

  constructor(private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _subgroupTemplateApiService: SubgroupTemplateApiService,
              private _subgroupTemplateGroupApiService: SubgroupTemplateGroupApiService,
              private _subgroupTemplateGroupVersionApiService: SubgroupTemplateGroupVersionApiService,
              private _positionApiService: PositionApiService) {
  }

  public get subgroupTemplateGroupVersion(): SubgroupTemplateGroupVersion {
    const node = this.selectedNode;
    if (node.data instanceof SubgroupTemplateGroup) {
      return node.data.subgroupTemplateGroupVersion;
    } else if (node.data instanceof RootSubgroupGroup) {
      return node.data.subgroupTemplateGroupVersion;
    } else if (node.data instanceof SubgroupGroup) {
      return node.data.subgroupTemplateGroupVersion;
    }
    return void 0;
  }

  public get query(): SubgroupTemplateGroupVersionQuery {
    return {
      positionLevelEnum: this.positionLevelNgxSelect.control.value ? this.positionLevelNgxSelect.control.value.data : void 0,
      positionId: this.positionNgxSelect.control.value ? this.positionNgxSelect.control.value.id : void 0,
      rankId: this.rankNgxSelect.control.value ? this.rankNgxSelect.control.value.id : void 0,
      subgroupGroupId: this.selectedNode.data.id
    };
  }

  public get subgroupGroup(): SubgroupGroup {
    if (this.selectedNode) {
      if (this.selectedNode.data instanceof SubgroupGroup) {
        return this.selectedNode.data;
      } else if (this.selectedNode.data instanceof RootSubgroupGroup) {
        return this.selectedNode.data.defaultSubgroupGroup;
      }
    }
    return void 0;
  }

  public async ngOnInit(): Promise<void> {
    this.positionLevelNgxSelect = new NgxSelect();
    this.positionLevelNgxSelect.labelTranslation = 'personPositionType';
    this.positionLevelNgxSelect.display = 'name';
    this.positionLevelNgxSelect.hasNone = true;
    this.positionLevelNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<PositionLevelEnum>(PositionLevelEnum, 'PositionLevelEnum');
    this.positionLevelNgxSelect.control.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        flatMap(value => this._positionApiService.getPositions({positionLevelEnum: value ? value.data : void 0, count: PropertyConstant.pageSizeMax}))
      )
      .subscribe((value) => {
        this.positionNgxSelect.items = value.list;
        this.tableData = [];
      });

    this.positionNgxSelect = new NgxSelect();
    this.positionNgxSelect.labelTranslation = 'personPosition';
    this.positionNgxSelect.display = 'name';
    this.positionNgxSelect.hasNone = true;
    this.positionNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(() => {
        this.tableData = [];
      });

    this.rankNgxSelect = new NgxSelect();
    this.rankNgxSelect.labelTranslation = 'rank';
    this.rankNgxSelect.display = 'name';
    this.rankNgxSelect.hasNone = true;
    this.rankNgxSelect.items = await this._participantRestApiService.getRanks();
    this.rankNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(() => {
        this.tableData = [];
      });

    this.positionLevelNgxSelect.control.setValue(void 0);

    this.dataSource = new DynamicDataSource(node => {
      const nextLevel = node ? (node.level || 0) + 1 : 0;
      if (!nextLevel) {
        return this._subgroupTemplateApiService.getSubgroupTemplateGroups(this.subgroupTemplate)
          .pipe(
            map(value => value
              .filter(x => !this.group || x.group.id == this.group.id)
              .map(x => new FlatNode(x, nextLevel, true)))
          );
      } else if (node.data instanceof SubgroupTemplateGroup) {
        return this._subgroupTemplateGroupApiService.getSubgroupTemplateGroupVersions(node.data)
          .pipe(
            flatMap(value => from(value)),
            filter(value => value.templateVersion.approved),
            flatMap(subgroupTemplateGroupVersion => this._subgroupTemplateGroupVersionApiService.getSubgroupTemplateGroupChildrenSubgroupGroups(subgroupTemplateGroupVersion)
              .pipe(map(subgroupGroups => subgroupGroups.map(subgroupGroup => {
                const rootSubgroup = new RootSubgroupGroup(node.data, subgroupTemplateGroupVersion, subgroupGroup);
                return new FlatNode(rootSubgroup, nextLevel, true);
              }))))
          );
      } else if (node.data instanceof RootSubgroupGroup) {
        return this._subgroupTemplateGroupVersionApiService.getSubgroupTemplateGroupChildrenSubgroupGroups(node.data.subgroupTemplateGroupVersion, {subgroupGroupId: node.data.defaultSubgroupGroup.id})
          .pipe(map(value => value.map(x => new FlatNode(x, nextLevel, true))));
      } else if (node.data instanceof SubgroupGroup) {
        return this._subgroupTemplateGroupVersionApiService.getSubgroupTemplateGroupChildrenSubgroupGroups(node.data.subgroupTemplateGroupVersion, {subgroupGroupId: node.data.id})
          .pipe(map(value => value.map(x => new FlatNode(x, nextLevel, true))));
      }
      return void 0;
    });
  }

  public onApply(): void {
    let subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;
    if (this.selectedNode.data instanceof RootSubgroupGroup || this.selectedNode.data instanceof SubgroupGroup) {
      subgroupTemplateGroupVersion = this.selectedNode.data.subgroupTemplateGroupVersion;
    }

    if (subgroupTemplateGroupVersion) {
      this._subgroupTemplateGroupVersionApiService.getSubgroupTemplateGroupVersionPositions(subgroupTemplateGroupVersion, this.query)
        .subscribe(value => {
          const tableData = value;
          const columnCount = value.map(x => x.subgroups.length).reduce((previousValue, currentValue) => Math.max(previousValue, currentValue));
          for (const item of tableData) {
            item.subgroups.length = columnCount;
            const defaultSubgroup = item.subgroups.find(x => (x.subgroupVersion as SubgroupVersion).defaultSubgroup);
            if (defaultSubgroup) {
              defaultSubgroup.subgroupVersion.name = defaultSubgroup.subgroupTemplateGroupVersion.template.name;
            }
          }
          this.tableData = tableData;
        });
    }
  }

  public onGetReport(): void {
    const query: any = this.query;
    query.byName = this.byName;
    window.open(this._subgroupTemplateGroupVersionApiService.getSubgroupTemplateGroupVersionReport(this.subgroupTemplateGroupVersion, query), '_blank');
  }

  public async onGetSubgroupGroupReceipt(): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'report';
    await modal.componentInstance.initializeBody(SubgroupGroupReceiptComponent, async component => {
      component.subgroupGroup = this.subgroupGroup;
    }, {componentFactoryResolver: this._componentFactoryResolver});
  }

  public async onGetSubgroupGroupAttendanceReport(): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'report';
    await modal.componentInstance.initializeBody(SubgroupGroupAttendanceReportComponent, async component => {
      component.subgroupGroup = this.subgroupGroup;
    }, {componentFactoryResolver: this._componentFactoryResolver});
  }

  public getNodeName(node: FlatNode): string {
    if (node.data instanceof SubgroupTemplateGroup) {
      return node.data.group.name;
    } else if (node.data instanceof RootSubgroupGroup) {
      let name = `${node.data.subgroupTemplateGroupVersion.template.name}\n`;
      if (node.data.subgroupTemplateGroupVersion.templateVersion.approved) {
        name += `(Подтвержденная версия ${node.data.subgroupTemplateGroupVersion.templateVersion.versionNumber})`;
      } else {
        name += `(Неподтвержденная версия ${node.data.subgroupTemplateGroupVersion.templateVersion.versionNumber})`;
      }
      return name;
    } else if (node.data instanceof SubgroupGroup) {
      return node.data.subgroupVersion.name;
    }
    return void 0;
  }

  public onSelectedNode(node: FlatNode) {
    this.selectedNode = node;
    this.tableData = [];
  }

}
