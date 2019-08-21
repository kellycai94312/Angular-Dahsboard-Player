import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../../../data/remote/model/person';
import {MenuItem} from '../../../common/item-line/model/menu-item';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {FileApiService} from '../../../../data/remote/rest-api/api/file/file-api.service';
import {map} from 'rxjs/operators';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {Router} from '@angular/router';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-person-head',
  templateUrl: './person-head.component.html',
  styleUrls: ['./person-head.component.scss']
})
export class PersonHeadComponent implements OnInit {

  @Input()
  public person: Person;

  @Input()
  public canEdit: boolean;

  @Output()
  public readonly navigate = new EventEmitter();

  @Output()
  public readonly editPerson = new EventEmitter();

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public actions: MenuItem[] = [];
  public hasConnection: boolean;

  constructor(private _fileApiService: FileApiService,
              private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _personApiService: PersonApiService) {
  }

  public async ngOnInit(): Promise<void> {
    this.hasConnection = (await this._participantRestApiService.hasConnection({id: this.person.id})).value;

    this.actions = [{
      translationLabel: 'sendMessage', action: async item => {
        await this.onSendMessage();
      }
    }, {
      translationLabel: this.hasConnection ? 'removeContact' : 'addContact',
      action: async item => {
        this.hasConnection = (await this._participantRestApiService.hasConnection({id: this.person.id})).value;
        if (this.hasConnection) {
          await this._participantRestApiService.removeConnection({id: this.person.id});
        } else {
          await this._participantRestApiService.createConnection({id: this.person.id});
        }
        item.translationLabel = this.hasConnection ? 'removeContact' : 'addContact';
      }
    }];
  }

  public async onSendMessage() {
    this._personApiService.getDialogue(this.person).subscribe(async value => {
      await this._router.navigate(['/conversation', value.id]);
    });
  };

  public onLogoChange(): void {
    this._fileApiService.getImages({clazz: FileClass.PERSON, objectId: this.person.id, type: ImageType.LOGO, count: 1})
      .pipe(map(value => {
          if (value.list) {
            // TODO: Update image
            // const image = (await this._participantRestApiService.getImages()).list[0];
            // this.personService.logoHandler.next(image);
            // const person = await this._appHelper.toPromise(this._authorizationService.personSubject.asObservable());
            // if (person.id == this.personService.personViewModel.data.id) {
            //   // TODO: Need to refresh image
            //   this._authorizationService.personSubject.next(this.personViewModel.data);
            // }
          }
        })
      );
  }

  public async onNavigate(): Promise<void> {
    this.navigate.emit();
    await this._router.navigate(['/person', this.person.id]);
  }

}
