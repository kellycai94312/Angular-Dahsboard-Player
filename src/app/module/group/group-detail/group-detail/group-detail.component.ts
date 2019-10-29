import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'app/data/local/component/base/base-component';
import { Group } from 'app/data/remote/model/group/base';
import { BaseGroupPerson } from 'app/data/remote/model/group/person';
import { GroupItemType } from '../model/group-item-type';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent extends BaseComponent<Group> implements OnInit {

  @Input()
  public group: Group;

  @Input()
  public groupPerson: BaseGroupPerson;

  public readonly groupItemTypeClass = GroupItemType;
  public menuItems: MenuItem[] = [];
  public selectedMenuItem: MenuItem;

  constructor() {
    super();
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.menuItems = Object.keys(GroupItemType).map(value => {
      const menuItem = new MenuItem();
      menuItem.labelTranslation = `groupItemTypeEnum.${value}`;
      menuItem.data = value;
      menuItem.disabled = !(value === GroupItemType.BASIC || value === GroupItemType.SCHEDULE);

      return menuItem;
    });
    this.selectedMenuItem = this.menuItems[0];
  }

  public onSelectMenuItem(item: MenuItem): void {
    if (!item.disabled) {
      this.selectedMenuItem = item;
    }
  }

  public onChangeGroupPerson(groupPerson: BaseGroupPerson): void {
    this.groupPerson = groupPerson;
  }

  public onNavigate(): void {
  }

}

class MenuItem {
  public disabled: boolean;
  public labelTranslation: string;
  public data: any;
}
