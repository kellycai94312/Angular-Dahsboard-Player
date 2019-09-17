import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxModalService } from '../../../../components/ngx-modal/service/ngx-modal.service';
import { BaseComponent } from '../../../../data/local/component/base/base-component';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { FileClass } from '../../../../data/remote/model/file/base/file-class';
import { ImageType } from '../../../../data/remote/model/file/image/image-type';
import { Group } from '../../../../data/remote/model/group/base/group';
import { Person } from '../../../../data/remote/model/person';
import { PersonApiService } from '../../../../data/remote/rest-api/api/person/person-api.service';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { AppHelper } from '../../../../utils/app-helper';
import { MenuItem } from '../../../common/item-line/model/menu-item';
import { ItemDisplay } from '../../../common/item-list/model/item-display';
import { PersonDetailComponent } from '../../person-detail/person-detail/person-detail.component';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.scss']
})
export class PersonItemComponent extends BaseComponent<Person> implements OnInit {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly propertyConstantClass = PropertyConstant;
  public readonly itemDisplayClass = ItemDisplay;

  public translateConnection: string;

  @Input()
  public visibleSendMessage: boolean;

  @Input()
  public visibleEditConnection: boolean;

  @Input()
  public itemDisplay: ItemDisplay;

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public canShowDetail: boolean;

  @Input()
  public clickableComponent = true;

  @Input()
  public group: Group;

  public actions: MenuItem[] = [];
  public hasConnection: boolean;

  constructor(private _appHelper: AppHelper,
              private _personApiService: PersonApiService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _ngxModalService: NgxModalService,
              private _participantRestApiService: ParticipantRestApiService,
              private _router: Router) {
    super();
  }

  protected async initializeComponent(data: Person): Promise<boolean> {
    await super.initializeComponent(data);

    return this._appHelper.tryLoad(async () => {
      await this.refreshConnection();
      this.actions = [];
      if (this.visibleSendMessage) {
        this.actions.push({
          iconName: 'message', action: async () => {
            await this.onSendMessage();
          }
        });
      }

      if (this.visibleEditConnection && this.translateConnection) {
        this.actions.push({
          iconName: this.hasConnection ? 'remove_circle_outline' : 'add_circle_outline', action: async item => {
            await this.onEditConnection();
            item.iconName = this.hasConnection ? 'remove_circle_outline' : 'add_circle_outline';
          }
        });
      }
    });
  }

  public onSendMessage(): void {
    this._personApiService.getDialogue(this.data).subscribe(async value => {
      await this._router.navigate(['/conversation', value.id]);
    });
  }

  public async onEditConnection(): Promise<void> {
    await this._appHelper.trySave(async () => {
      const hasConnection = await this.refreshConnection();
      if (hasConnection) {
        await this._participantRestApiService.removeConnection({id: this.data.id});
      } else {
        await this._participantRestApiService.createConnection({id: this.data.id});
      }
      await this.refreshConnection();
    });
  }

  public async onShowDetail(): Promise<void> {
    if (!this.clickableComponent) {
      return;
    }
    const modal = this._ngxModalService.open();
    modal.componentInstance.title = `${this.data.lastName} ${this.data.firstName}`;
    modal.componentInstance.useContentPadding = false;
    await modal.componentInstance.initializeBody(PersonDetailComponent, async component => {
      component.group = this.group;
      await component.initialize(this._appHelper.cloneObject(this.data));
      component.onNavigate = () => modal.close();
    }, {componentFactoryResolver: this._componentFactoryResolver});
  }

  private async refreshConnection(): Promise<boolean> {
    this.hasConnection = (await this._participantRestApiService.hasConnection({id: this.data.id})).value;
    this.translateConnection = this.hasConnection ? 'removeContact' : 'addContact';

    return this.hasConnection;
  }

}
