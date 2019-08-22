import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {BaseGroupComponent} from '../../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../../service/group.service';
import {AppHelper} from '../../../../../../../utils/app-helper';
import {NgxSelect} from '../../../../../../../module/ngx/ngx-select/model/ngx-select';
import {ParticipantRestApiService} from '../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {map, takeWhile} from 'rxjs/operators';
import {FlatNode} from '../../../../../../../module/ngx/ngx-tree/model/flat-node';
import {GroupClusterApiService} from '../../../../../../../data/remote/rest-api/api/group-cluster/group-cluster-api.service';
import {PositionLevelEnum} from '../../../../../../../data/remote/model/person-position/position-level-enum';
import {TranslateObjectService} from '../../../../../../../shared/translate-object.service';
import {GroupApiService} from '../../../../../../../data/remote/rest-api/api/group/group-api.service';
import {Observable, of} from 'rxjs';
import {ClusterGroupPosition} from '../../../../../../../data/remote/rest-api/api/group/model/cluster-group-position';
import {GroupCluster} from '../../../../../../../data/remote/model/group/connection/group-cluster';
import {NgxModalService} from '../../../../../../../components/ngx-modal/service/ngx-modal.service';
import {GroupWorkTimeReportComponent} from '../../../../../../../module/group/report/group-work-time-report/group-work-time-report/group-work-time-report.component';

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
    this.rankNgxSelect.items = await this._participantRestApiService.getRanks();
    this.rankNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(() => {
        this.clusterGroupPositions = [];
      });
  }

  public onGroupClusterChange(value: GroupCluster): void {
    this._groupCluster = value;
  }

  public onSelectedNode(node: FlatNode) {
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
