import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxModalService } from '../../../../components/ngx-modal/service/ngx-modal.service';
import { BaseComponent } from '../../../../data/local/component/base/base-component';
import { FileClass } from '../../../../data/remote/model/file/base/file-class';
import { ImageType } from '../../../../data/remote/model/file/image/image-type';
import { Group } from '../../../../data/remote/model/group/base/group';
import { GroupTypeEnum } from '../../../../data/remote/model/group/base/group-type-enum';
import { OrganizationType } from '../../../../data/remote/model/group/organization/organization-type';
import { GroupApiService } from '../../../../data/remote/rest-api/api/group/group-api.service';
import { AppHelper } from '../../../../utils/app-helper';
import { ItemDisplay } from '../../../common/item-list/model/item-display';
import { GroupDetailComponent } from '../../group-detail/group-detail/group-detail.component';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent<T extends Group> extends BaseComponent<T> implements OnInit {

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public itemDisplay: ItemDisplay;

  @Input()
  public clickableComponent = true;

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly itemDisplayClass = ItemDisplay;

  constructor(private _translateService: TranslateService,
              private _appHelper: AppHelper,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _groupApiService: GroupApiService,
              private _ngxModalService: NgxModalService) {
    super();
  }

  public get subtitle(): string {
    if (this.data.discriminator === GroupTypeEnum.ORGANIZATION) {
      const organizationType = (this.data as any).organizationType as OrganizationType;
      if (organizationType) {
        return organizationType.name;
      }
    }

    return this._translateService.instant(`groupTypeEnum.${this.data.discriminator}`);
  }

  public async onShowDetail(): Promise<void> {
    if (!this.clickableComponent) {
      return;
    }

    const modal = this._ngxModalService.open();
    modal.componentInstance.title = `${this.data.name}`;
    modal.componentInstance.useContentPadding = false;
    await modal.componentInstance.initializeBody(GroupDetailComponent, async component => {
      component.group = this.data;
      component.groupPerson = await this._groupApiService.getCurrentGroupPerson(this.data).toPromise();
      await component.initialize(this._appHelper.cloneObject(this.data));
      component.onNavigate = () => modal.close();
    }, {componentFactoryResolver: this._componentFactoryResolver});
  }

}
