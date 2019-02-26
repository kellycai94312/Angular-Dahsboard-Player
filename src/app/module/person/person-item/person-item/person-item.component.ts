import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Person} from '../../../../data/remote/model/person';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ImageFormat} from '../../../../data/local/image-format';
import {Dialogue} from '../../../../data/remote/model/chat/conversation/dialogue';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.scss']
})
export class PersonItemComponent extends BaseComponent<Person> implements OnInit {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly propertyConstantClass = PropertyConstant;
  public readonly imageFormatClass = ImageFormat;

  public translateConnection: string;

  @Input()
  public visibleSendMessage: boolean;

  @Input()
  public visibleEditConnection: boolean;

  @Input()
  public width: number;

  @Input()
  public height: number;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _router: Router) {
    super();
  }

  protected async initializeComponent(data: Person): Promise<boolean> {
    await super.initializeComponent(data);
    return await this._appHelper.tryLoad(async () => {
      await this.refreshConnection();
    });
  }

  public onSendMessage = async () => {
    await this._appHelper.tryLoad(async () => {
      const dialogue: Dialogue = await this._participantRestApiService.getDialogue({personId: this.data.id});
      await this._router.navigate(['/conversation', dialogue.id]);
    });
  };

  public onEditConnection = async () => {
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
    const hasConnection = (await this._participantRestApiService.hasConnection({id: this.data.id})).value;
    this.translateConnection = hasConnection ? 'removeContact' : 'addContact';
    return hasConnection;
  }

}
