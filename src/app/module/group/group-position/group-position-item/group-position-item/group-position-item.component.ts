import {Component, ComponentFactoryResolver, Input} from '@angular/core';
import {BaseComponent} from '../../../../../data/local/component/base/base-component';
import {GroupPosition} from '../../../../../data/remote/model/person-position/group-position';
import {NgxModalService} from '../../../../../components/ngx-modal/service/ngx-modal.service';
import {EditGroupPositionComponent} from '../../edit-group-position/edit-group-position/edit-group-position.component';
import {UtilService} from '../../../../../services/util/util.service';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {Position} from '../../../../../data/remote/model/person-position/position';
import {BasePosition} from '../../../../../data/remote/model/person-position/base-position';

@Component({
  selector: 'app-group-position-item',
  templateUrl: './group-position-item.component.html',
  styleUrls: ['./group-position-item.component.scss']
})
export class GroupPositionItemComponent extends BaseComponent<BasePosition> {

  @Input()
  public canEdit: boolean;

  @Input()
  public group: Group;

  constructor(private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _utilService: UtilService) {
    super();
  }

  public get position(): Position {
    return (this.data as GroupPosition).relevantPosition || this.data as any;
  }

  public async onEdit(): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'personPosition';
    await modal.componentInstance.initializeBody(EditGroupPositionComponent, async component => {
      component.group = this.group;
      await component.initialize(this._utilService.clone(this.data) as any);
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            this.data = component.data;
          }
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          if (await this._ngxModalService.remove(modal, component)) {
            this.data = component.data;
          }
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});
  }

}
