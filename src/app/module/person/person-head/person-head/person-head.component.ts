import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map, takeWhile } from 'rxjs/operators';
import { FileClass } from '../../../../data/remote/model/file/base/file-class';
import { ImageType } from '../../../../data/remote/model/file/image/image-type';
import { Person } from '../../../../data/remote/model/person';
import { FileApiService } from '../../../../data/remote/rest-api/api/file/file-api.service';
import { PersonApiService } from '../../../../data/remote/rest-api/api/person/person-api.service';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { AuthorizationService } from '../../../../shared/authorization.service';
import { PermissionService } from '../../../../shared/permission.service';
import { MenuItem } from '../../../common/item-line/model/menu-item';

@Component({
  selector: 'app-person-head',
  templateUrl: './person-head.component.html',
  styleUrls: ['./person-head.component.scss']
})
export class PersonHeadComponent implements OnInit, OnDestroy {

  @Input()
  public person: Person;

  @Input()
  public canEdit: boolean;

  @Input()
  public canEditPerson = true;

  @Output()
  public readonly navigate = new EventEmitter();

  @Output()
  public readonly editPerson = new EventEmitter();

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public actions: MenuItem[] = [];
  public hasConnection: boolean;
  private _notDestroyed = true;

  constructor(private _fileApiService: FileApiService,
              private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _matIconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer,
              private _authorizationService: AuthorizationService,
              private _permissionService: PermissionService,
              private _personApiService: PersonApiService) {
    this._matIconRegistry.addSvgIcon('personDelete', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/person_delete.svg'));
  }

  public async ngOnInit(): Promise<void> {
    this.hasConnection = (await this._participantRestApiService.hasConnection({id: this.person.id})).value;

    this._authorizationService.person$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(person => {
        const canEditPerson = this._permissionService.canEditPerson(this.person).toPromise();
        this.actions = [];
        if (this.canEditPerson && canEditPerson) {
          this.actions.push({
            iconName: 'edit', action: item => {
              this.editPerson.emit();
            }
          });
        }

        if (!this._permissionService.areYouCreator(this.person, person)) {
          this.actions.push(...[
            {
              iconName: 'message', action: async item => {
                await this.onSendMessage();
              }
            },
            {
              iconName: this.hasConnection ? 'personDelete' : 'person_add',
              action: async item => {
                this.hasConnection = (await this._participantRestApiService.hasConnection({id: this.person.id})).value;
                if (this.hasConnection) {
                  await this._participantRestApiService.removeConnection({id: this.person.id});
                } else {
                  await this._participantRestApiService.createConnection({id: this.person.id});
                }
                item.iconName = this.hasConnection ? 'personDelete' : 'person_add';
              }
            }
          ]);
        }
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
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
