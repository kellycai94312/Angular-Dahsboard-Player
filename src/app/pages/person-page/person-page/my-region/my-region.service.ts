import { Injectable } from '@angular/core';
import { Note } from '../../../../data/remote/model/note/base/note';
import { NoteQuery } from '../../../../data/remote/rest-api/query/note-query';
import { NoteType } from '../../../../data/remote/model/note/base/note-type';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { AppHelper } from '../../../../utils/app-helper';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteModalComponent } from './note-modal/note-modal.component';
import { ModalEvent } from '../../../../data/local/modal-event';

@Injectable()
export class MyRegionService {

  public notes: Note[];
  public pageSize: number;
  private _noteQuery: NoteQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal,
              private _appHelper: AppHelper) {
    this.pageSize = PropertyConstant.pageSize;
  }

  public add = async () => {
    const ref = this._modalService.open(NoteModalComponent, {size: 'lg'});
    ref.componentInstance.modalEvent = ModalEvent[ModalEvent.ADD];
    ref.componentInstance.noteType = this._noteQuery.noteType;
    ref.componentInstance.onSave = async (item: Note) => {
      await this._participantRestApiService.addNote(item);
      await this.updateListAsync();
      ref.dismiss();
    };
  };

  public async edit(item: Note) {
    const ref = this._modalService.open(NoteModalComponent, {size: 'lg'});
    ref.componentInstance.modalEvent = ModalEvent[ModalEvent.EDIT];
    ref.componentInstance.note = Object.assign({}, item);
    ref.componentInstance.noteType = this._noteQuery.noteType;
    ref.componentInstance.onSave = async (newItem: Note) => {
      await this._participantRestApiService.updateNote(newItem, null, {id: item.id});
      await this.updateListAsync();
      ref.dismiss();
    };
  }

  public async remove(item: Note) {
    await this._participantRestApiService.removeNote({id: item.id});
    await this.updateListAsync();
  }

  public async initialize(noteType: NoteType) {
    this._noteQuery = new NoteQuery();
    this._noteQuery.noteType = NoteType[noteType];
    this._noteQuery.from = 0;
    this._noteQuery.count = this.pageSize;
    await this.updateListAsync();
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async setName(e: any) {
    this._noteQuery.name = e.value;
    await this.updateListAsync();
  }

  public async setPhone(e: any) {
    this._noteQuery.phone = e.value;
    await this.updateListAsync();
  }

  public async setEmail(e: any) {
    this._noteQuery.email = e.value;
    await this.updateListAsync();
  }

  public async setOrganization(e: any) {
    this._noteQuery.organization = e.value;
    await this.updateListAsync();
  }

  public async setClub(e: any) {
    this._noteQuery.club = e.value;
    await this.updateListAsync();
  }

  public async setAge(e: any) {
    this._noteQuery.age = e.value;
    await this.updateListAsync();
  }

  private async updateListAsync(from: number = 0) {
    this._noteQuery.from = from;
    const container = await this._participantRestApiService.getNotes(this._noteQuery);
    this.notes = this._appHelper.pushItemsInList(from, this.notes, container);
  }

}

