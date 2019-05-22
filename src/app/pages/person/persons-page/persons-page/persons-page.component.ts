import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {Person} from '../../../../data/remote/model/person';
import {ActivatedRoute, Router} from '@angular/router';
import {PermissionService} from '../../../../shared/permission.service';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {NgxTabAction} from '../../../../module/ngx/ngx-tabs/model/ngx-tab-action';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit {

  public readonly tabs: NgxTab[];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _permissionService: PermissionService) {
    this.tabs = [
      {translation: 'myContacts', link: 'my'},
      {translation: 'all', link: 'all'}
    ];
  }

  async ngOnInit(): Promise<void> {
    if (await this._permissionService.hasAnyRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR])) {
      const addSplitButtonItem: NgxTabAction = {
        iconName: 'add',
        action: async () => {
          if (await this._templateModalService.showEditPersonModal(new Person(), null, {componentFactoryResolver: this._componentFactoryResolver})) {
            await this._router.navigate([], {relativeTo: this._activatedRoute});
          }
        },
      };

      for (const item of this.tabs) {
        item.actions = item.actions || [];
        item.actions.push(addSplitButtonItem);
      }
    }
  }

}
