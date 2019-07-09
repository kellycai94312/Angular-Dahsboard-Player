import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Person} from '../../../../data/remote/model/person';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Dialogue} from '../../../../data/remote/model/chat/conversation/dialogue';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Router} from '@angular/router';
import {ItemDisplay} from '../../../common/item-list/model/item-display';
import {MenuItem} from '../../../common/item-line/model/menu-item';

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

  public actions: MenuItem[] = [];
  public hasConnection: boolean;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _router: Router) {
    super();
  }

  protected async initializeComponent(data: Person): Promise<boolean> {
    await super.initializeComponent(data);
    return await this._appHelper.tryLoad(async () => {
      await this.refreshConnection();
      this.actions = [
        {
          iconName: 'message', action: async item => {
            await this.onSendMessage();
          }
        },
        {
          iconName: this.hasConnection ? 'remove_circle_outline' : 'add_circle_outline', action: async item => {
            await this.onEditConnection();
            item.iconName = this.hasConnection ? 'remove_circle_outline' : 'add_circle_outline';
          }
        }
      ];
    });
  }

  public async onSendMessage() {
    await this._appHelper.tryLoad(async () => {
      const dialogue: Dialogue = await this._participantRestApiService.getDialogue({personId: this.data.id});
      await this._router.navigate(['/conversation', dialogue.id]);
    });
  };

  public async onEditConnection() {
    await this._appHelper.trySave(async () => {
      const hasConnection = await this.refreshConnection();
      if (hasConnection) {
        await this._participantRestApiService.removeConnection({id: this.data.id});
      } else {
        await this._participantRestApiService.createConnection({id: this.data.id});
      }
      await this.refreshConnection();
    });
  };

  private async refreshConnection(): Promise<boolean> {
    this.hasConnection = (await this._participantRestApiService.hasConnection({id: this.data.id})).value;
    this.translateConnection = this.hasConnection ? 'removeContact' : 'addContact';
    return this.hasConnection;
  }

}
