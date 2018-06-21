import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../../../data/remote/model/note/base/note';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NoteType} from '../../../../../data/remote/model/note/base/note-type';
import {ModalEvent} from '../../../../../data/local/modal-event';
import {SchoolNote} from '../../../../../data/remote/model/note/school-note';
import {TrainerNote} from '../../../../../data/remote/model/note/trainer-note';
import {AgentNote} from '../../../../../data/remote/model/note/agent-note';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit {

  @Input()
  note: Note;

  @Input()
  noteType: any;

  @Input()
  modalEvent: any;

  @Input()
  onSave: Function;

  public headerNameKey: string;

  constructor(public modal: NgbActiveModal) {
    this.note = new Note();
  }

  async ngOnInit() {
    // TODO: Set universal header name
    let translatePath = '';
    switch (this.noteType) {
      case NoteType.SCHOOL:
        if (this.modalEvent === ModalEvent.EDIT) {
          translatePath = 'persons.person.myRegion.school.edit';
        } else {
          translatePath = 'persons.person.myRegion.school.add';
          this.note = new SchoolNote();
        }
        break;
      case NoteType.TRAINER:
        if (this.modalEvent === ModalEvent.EDIT) {
          translatePath = 'persons.person.myRegion.trainer.edit';
        } else {
          translatePath = 'persons.person.myRegion.trainer.add';
          this.note = new TrainerNote();
        }
        break;
      case NoteType.AGENT:
        if (this.modalEvent === ModalEvent.EDIT) {
          translatePath = 'persons.person.myRegion.agent.edit';
        } else {
          translatePath = 'persons.person.myRegion.agent.add';
          this.note = new AgentNote();
        }
    }
    this.headerNameKey = translatePath;
  }

}
