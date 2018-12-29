import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {Person} from '../../../../data/remote/model/person';
import {ActivatedRoute, Router} from '@angular/router';
import {Tab} from '../../../../data/local/tab';
import {PermissionService} from '../../../../shared/permission.service';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit {

  public readonly tabs: Tab[];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _permissionService: PermissionService) {
    this.tabs = [
      {
        nameKey: 'myContacts',
        routerLink: 'my'
      },
      {
        nameKey: 'all',
        routerLink: 'all'
      }
    ];
  }

  async ngOnInit(): Promise<void> {
    if (await this._permissionService.hasAnyRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR])) {
      const addSplitButtonItem: SplitButtonItem = {
        nameKey: 'add',
        callback: async () => {
          if (await this._templateModalService.showEditPersonModal(new Person(), null, {componentFactoryResolver: this._componentFactoryResolver})) {
            await this._router.navigate([], {relativeTo: this._activatedRoute});
          }
        },
      };

      for (const item of this.tabs) {
        if (!item.splitButtonsItems) {
          item.splitButtonsItems = [];
        }
        item.splitButtonsItems.push(addSplitButtonItem);
      }
    }
  }

}
