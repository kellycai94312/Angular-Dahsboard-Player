import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { Group } from 'app/data/remote/model/group/base';
import { GroupCluster } from 'app/data/remote/model/group/connection';
import { PositionLevelEnum } from 'app/data/remote/model/person-position/position-level-enum';
import { GroupApiService, GroupClusterApiService } from 'app/data/remote/rest-api/api';
import { ClusterGroupPosition } from 'app/data/remote/rest-api/api/group/model/cluster-group-position';
import { RankApiService } from 'app/data/remote/rest-api/api/rank/rank-api.service';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { GroupWorkTimeReportComponent } from 'app/module/group/report/group-work-time-report/group-work-time-report/group-work-time-report.component';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { FlatNode } from 'app/module/ngx/ngx-tree/model/flat-node';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { TranslateObjectService } from 'app/shared/translate-object.service';
import { AppHelper } from 'app/utils/app-helper';
import { Observable, of } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-group-reports',
  templateUrl: './group-reports.component.html',
  styleUrls: ['./group-reports.component.scss']
})
export class GroupReportsComponent extends BaseGroupComponent<Group> implements OnInit {

  public readonly organizationTypeNgxSelect = new NgxSelect();
  public readonly positionLevelNgxSelect = new NgxSelect();
  public readonly positionNgxSelect = new NgxSelect();
  public readonly rankNgxSelect = new NgxSelect();
  public selectedNode: FlatNode;
  public clusterGroupPositions: ClusterGroupPosition[] = [];
  public byName: boolean;
  private _groupCluster: GroupCluster;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupClusterApiService: GroupClusterApiService,
              private _rankApiService: RankApiService,
              private _groupApiService: GroupApiService,
              private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _translateObjectService: TranslateObjectService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.organizationTypeNgxSelect.labelTranslation = 'organizationType';
    this.organizationTypeNgxSelect.display = 'name';
    this.organizationTypeNgxSelect.hasNone = true;
    this.organizationTypeNgxSelect.items = await this._participantRestApiService.getOrganizationTypes();
    this.organizationTypeNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(() => {
        this.clusterGroupPositions = [];
      });

    this.positionLevelNgxSelect.labelTranslation = 'personPositionType';
    this.positionLevelNgxSelect.display = 'name';
    this.positionLevelNgxSelect.hasNone = true;
    this.positionLevelNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<PositionLevelEnum>(PositionLevelEnum, 'PositionLevelEnum');
    this.positionLevelNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(() => {
        this._updateGroupPositions();
      });

    this.positionNgxSelect.labelTranslation = 'personPosition';
    this.positionNgxSelect.display = 'name';
    this.positionNgxSelect.hasNone = true;
    this.positionNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(() => {
        this.clusterGroupPositions = [];
      });

    this.rankNgxSelect.labelTranslation = 'rank';
    this.rankNgxSelect.display = 'name';
    this.rankNgxSelect.hasNone = true;
    this.rankNgxSelect.items = await this._rankApiService.getRanks().toPromise();
    this.rankNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(() => {
        this.clusterGroupPositions = [];
      });
  }

  public onGroupClusterChange(value: GroupCluster): void {
    this._groupCluster = value;
  }

  public onSelectedNode(node: FlatNode): void {
    this.selectedNode = node;

    this._updateGroupPositions();
  }

  public onUpdateReport(): void {
    this._updateTableData().subscribe();
  }

  public async getGroupTimeReport(): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'report';

    await modal.componentInstance.initializeBody(GroupWorkTimeReportComponent, async component => {
      component.groupCluster = this._groupCluster;
      component.group = this.selectedNode.data;
    }, {componentFactoryResolver: this._componentFactoryResolver});
  }

  private _updateGroupPositions(): void {
    this.positionNgxSelect.control.reset();
    this.positionNgxSelect.control.disable();
    this._groupClusterApiService.getNestedGroupPositions(this._groupCluster,
      this.selectedNode.data, {positionLevelEnum: this.positionLevelNgxSelect.control.value ? this.positionLevelNgxSelect.control.value.data : void 0})
      .subscribe(positions => {
        this.positionNgxSelect.items = positions;
        if (positions.length) {
          this.positionNgxSelect.control.enable();
        }
        this.clusterGroupPositions = [];
      });
  }

  private _updateTableData(): Observable<boolean> {
    const group = this.selectedNode.data;
    const groupCluster = this._groupCluster;
    if (group && groupCluster) {
      return this._groupApiService.getClusterGroupPositions(group, groupCluster, {
        organizationTypeId: this.organizationTypeNgxSelect.control.value ? this.organizationTypeNgxSelect.control.value.id : void 0,
        positionLevelEnum: this.positionLevelNgxSelect.control.value ? this.positionLevelNgxSelect.control.value.data : void 0,
        positionId: this.positionNgxSelect.control.value ? this.positionNgxSelect.control.value.id : void 0,
        rankId: this.rankNgxSelect.control.value ? this.rankNgxSelect.control.value.id : void 0
      })
        .pipe(map(value => {
          const clusterGroupPositions = value;
          const columnCount = value.map(x => x.groups.length).reduce((previousValue, currentValue) => Math.max(previousValue, currentValue));
          for (const item of clusterGroupPositions) {
            item.groups.length = columnCount;
          }
          this.clusterGroupPositions = clusterGroupPositions;

          return true;
        }));
    }

    return of(false);
  }

}
