import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ItemDisplay} from '../../../common/item-list/model/item-display';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {TranslateService} from '@ngx-translate/core';
import {OrganizationType} from '../../../../data/remote/model/group/organization/organization-type';

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

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly itemDisplayClass = ItemDisplay;

  constructor(private _translateService: TranslateService) {
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

}
