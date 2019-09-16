import {Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {NodeConfiguration} from '../../../ngx/ngx-tree/model/node-configuration';
import {FlatNode} from '../../../ngx/ngx-tree/model/flat-node';
import {DynamicDataSource} from '../../../ngx/ngx-tree/utils/dynamic-data-source';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {map, takeWhile} from 'rxjs/operators';
import {GroupCluster} from '../../../../data/remote/model/group/connection/group-cluster';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {GroupClusterApiService} from '../../../../data/remote/rest-api/api/group-cluster/group-cluster-api.service';
import {Group} from '../../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-group-tree',
  templateUrl: './group-tree.component.html',
  styleUrls: ['./group-tree.component.scss']
})
export class GroupTreeComponent implements OnInit, OnDestroy {

  @ContentChild('itemTemplate', { static: false })
  public itemTemplate: TemplateRef<any>;

  @Input()
  public group: Group;

  @Output()
  public readonly selectedNodeChange = new EventEmitter<FlatNode>();

  @Output()
  public readonly groupClusterChange = new EventEmitter<GroupCluster>();

  public readonly clusterNgxSelect = new NgxSelect();
  public readonly nodeConfigurations = [
    new NodeConfiguration('leaf'),
    new NodeConfiguration('nested', (index, nodeData: FlatNode) => {
      return nodeData.expandable;
    })
  ];
  public selectedNode: FlatNode;
  public dataSource: DynamicDataSource<FlatNode>;
  private _notDestroyed = true;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupClusterApiService: GroupClusterApiService) {
  }

  public async ngOnInit(): Promise<void> {
    const groupClusters = (await this._participantRestApiService.getGroupClusters({}, {count: PropertyConstant.pageSize}, {groupId: this.group.id})).list;
    this.clusterNgxSelect.labelTranslation = 'cluster';
    this.clusterNgxSelect.display = 'name';
    this.clusterNgxSelect.items = groupClusters;
    this.clusterNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe((groupCluster: GroupCluster) => {
        this.groupClusterChange.emit(groupCluster);
        this.onSelectedNode(void 0);

        this.dataSource = new DynamicDataSource(node => {
          const nextLevel = node ? (node.level || 0) + 1 : 0;
          return this._groupClusterApiService.getChildrenGroups(groupCluster, node ? node.data : this.group)
            .pipe(map(value => value.map(x => new FlatNode(x, nextLevel, true))));
        });
      });

    if (groupClusters.length) {
      this.clusterNgxSelect.control.setValue(groupClusters[0]);
    }
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  public onSelectedNode(node: FlatNode) {
    this.selectedNode = node;
    this.selectedNodeChange.emit(node);
  }

}
