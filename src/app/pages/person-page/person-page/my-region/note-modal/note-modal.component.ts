import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Note } from '../../../../../data/remote/model/note/base/note';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteType } from '../../../../../data/remote/model/note/base/note-type';
import { TranslateService } from '@ngx-translate/core';
import { ModalEvent } from '../../../../../data/local/modal-event';
import { SchoolNote } from '../../../../../data/remote/model/note/school-note';
import { TrainerNote } from '../../../../../data/remote/model/note/trainer-note';
import { AgentNote } from '../../../../../data/remote/model/note/agent-note';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit, AfterViewInit {

  @Input()
  note: Note;

  @Input()
  noteType: any;

  @Input()
  modalEvent: any;

  @Input()
  onSave: Function;

  header: string;

  constructor(public modal: NgbActiveModal,
              private _translateService: TranslateService) {
    this.note = new Note();
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    let translatePath = '';
    switch (this.noteType) {
      case NoteType[NoteType.SCHOOL]:
        if (this.modalEvent === ModalEvent[ModalEvent.EDIT]) {
          translatePath = 'persons.person.myRegion.school.edit';
        } else {
          translatePath = 'persons.person.myRegion.school.add';
          this.note = new SchoolNote();
        }
        break;
      case NoteType[NoteType.TRAINER]:
        if (this.modalEvent === ModalEvent[ModalEvent.EDIT]) {
          translatePath = 'persons.person.myRegion.trainer.edit';
        } else {
          translatePath = 'persons.person.myRegion.trainer.add';
          this.note = new TrainerNote();
        }
        break;
      case NoteType[NoteType.AGENT]:
        if (this.modalEvent === ModalEvent[ModalEvent.EDIT]) {
          translatePath = 'persons.person.myRegion.agent.edit';
        } else {
          translatePath = 'persons.person.myRegion.agent.add';
          this.note = new AgentNote();
        }
    }
    this.header = await this._translateService.get(translatePath).toPromise();
  }
}
