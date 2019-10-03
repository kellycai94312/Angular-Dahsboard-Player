import { Component, OnInit } from '@angular/core';
import { NameWrapper } from '../../../data/local/name-wrapper';
import { Group } from '../../../data/remote/model/group/base';
import { MenuItem } from '../../../module/common/item-line/model/menu-item';
import { TemplateModalService } from '../../../service/template-modal.service';
import { GroupsComponent } from '../groups/groups/groups.component';
import { ContactItem } from '../model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public items: Array<NameWrapper<MenuData>> = [];
  public visibleMenu = true;
  public actions: Array<MenuItem>;
  public rightActions: Array<MenuItem>;

  constructor(private _templateModalService: TemplateModalService) {
  }

  public ngOnInit(): void {
    this.items = Object.keys(ContactItem).map(value => new NameWrapper(this._getPathByContactItem(value as ContactItem), `contactItemEnum.${value}`));

    this.rightActions = [
      {
        iconName: 'menu',
        action: item => {
          this.visibleMenu = !this.visibleMenu;
        }
      }
    ];
  }

  public onActiveRouterOutlet(value: any): void {
    if (value instanceof GroupsComponent) {
      this.actions = [
        {
          iconName: 'add',
          action: async () => {
            await this._templateModalService.showEditGroupModal(new Group());
          }
        }
      ];
    } else {
      this.actions = [];
    }
  }

  private _getPathByContactItem(value: ContactItem): MenuData {
    switch (value) {
      case ContactItem.PERSONS:
        return {link: 'person', iconName: 'person'};
      case ContactItem.GROUPS:
        return {link: 'group', iconName: 'group'};
      case ContactItem.PLACES:
        return {link: void 0, iconName: 'room'};
      // return {link: 'place', iconName: 'room'};
      case ContactItem.EVENTS:
        return {link: void 0, iconName: 'event'};
      // return {link: 'event', iconName: 'event'};
      default:
        return void 0;
    }
  }

}

class MenuData {
  public link: string;
  public iconName: string;
}
