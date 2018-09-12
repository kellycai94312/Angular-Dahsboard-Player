import {Injectable, OnDestroy} from '@angular/core';

import {Note} from '../../../../data/remote/model/note/base/note';
import {NoteQuery} from '../../../../data/remote/rest-api/query/note-query';
import {NoteType} from '../../../../data/remote/model/note/base/note-type';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditNoteComponent} from '../../component/edit-note/edit-note.component';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonService} from '../person.service';
import {ISubscription} from 'rxjs-compat/Subscription';

@Injectable()
export class MyRegionService implements OnDestroy {

  public noteQuery: NoteQuery;

  public reset: () => Promise<void>;
  public canEdit: boolean;
  private readonly _personViewModelSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper,
              private _personService: PersonService) {
    this.noteQuery = new NoteQuery();
    this.noteQuery.noteType = NoteType.AGENT;
    this.noteQuery.from = 0;
    this.noteQuery.count = PropertyConstant.pageSize;
    this._personViewModelSubscription = _personService.personViewModelSubject.subscribe(async value => {
      this.canEdit = await this._personService.allowEdit();
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._personViewModelSubscription);
  }

  public onAdd = async () => {
    const note = new Note();
    note.discriminator = this.noteQuery.noteType;
    note.noteType = this.noteQuery.noteType;
    await this.showModal(note);
  };

  public onEdit = async (obj: Note) => {
    await this.showModal(obj);
  };

  public async showModal(note: Note): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditNoteComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this._appHelper.cloneObject(note));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })];
    });

    modal.result.then(async x => {
    }, async reason => {
      await this.initialize(this.noteQuery.noteType);
    });
  }

  public async initialize(noteType: NoteType) {
    this.noteQuery.noteType = noteType;
    this.noteQuery.from = 0;
    await this.updateItems();
  }

  public getItems: Function = async (pageQuery: PageQuery) => {
    return await this._participantRestApiService.getNotes(pageQuery);
  };

  public async setName(e: any) {
    this.noteQuery.name = e.value;
    await this.updateItems();
  }

  public async setPhone(e: any) {
    this.noteQuery.phone = e.value;
    await this.updateItems();
  }

  public async setEmail(e: any) {
    this.noteQuery.email = e.value;
    await this.updateItems();
  }

  public async setOrganization(e: any) {
    this.noteQuery.organization = e.value;
    await this.updateItems();
  }

  public async setClub(e: any) {
    this.noteQuery.club = e.value;
    await this.updateItems();
  }

  public async setAge(e: any) {
    this.noteQuery.age = e.value;
    await this.updateItems();
  }

  private async updateItems() {
    await this.reset();
  }

}

