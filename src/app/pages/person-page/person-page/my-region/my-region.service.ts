import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Note} from '../../../../data/remote/model/note/base/note';
import {NoteQuery} from '../../../../data/remote/rest-api/query/note-query';
import {NoteType} from '../../../../data/remote/model/note/base/note-type';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NoteModalComponent} from './note-modal/note-modal.component';
import {ModalEvent} from '../../../../data/local/modal-event';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';

@Injectable()
export class MyRegionService {

  public readonly noteQuery: NoteQuery;

  public reset: () => Promise<void>;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal) {
    this.noteQuery = new NoteQuery();
    this.noteQuery.noteType = NoteType.AGENT;
    this.noteQuery.from = 0;
    this.noteQuery.count = PropertyConstant.pageSize;
  }

  public add = async () => {
    const ref = this._modalService.open(NoteModalComponent, {size: 'lg'});
    ref.componentInstance.modalEvent = ModalEvent.ADD;
    ref.componentInstance.noteType = this.noteQuery.noteType;
    ref.componentInstance.onSave = async (item: Note) => {
      await this._participantRestApiService.addNote(item);
      await this.updateItems();
      ref.dismiss();
    };
  };

  public async edit(item: Note) {
    const ref = this._modalService.open(NoteModalComponent, {size: 'lg'});
    ref.componentInstance.modalEvent = ModalEvent[ModalEvent.EDIT];
    ref.componentInstance.note = Object.assign({}, item);
    ref.componentInstance.noteType = this.noteQuery.noteType;
    ref.componentInstance.onSave = async (newItem: Note) => {
      await this._participantRestApiService.updateNote(newItem, null, {id: item.id});
      await this.updateItems();
      ref.dismiss();
    };
  }

  public async remove(item: Note) {
    await this._participantRestApiService.removeNote({id: item.id});
    await this.updateItems();
  }

  public async initialize(noteType: NoteType) {
    this.noteQuery.noteType = noteType;
    this.noteQuery.from = 0;
    await this.updateItems();
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
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

