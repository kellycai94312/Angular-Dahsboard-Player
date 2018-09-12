import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NoteType} from '../../../../data/remote/model/note/base/note-type';
import {Note} from '../../../../data/remote/model/note/base/note';
import {AgentNote} from '../../../../data/remote/model/note/agent-note';
import {TrainerNote} from '../../../../data/remote/model/note/trainer-note';
import {ClientError} from '../../../../data/local/error/client-error';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent extends BaseEditComponent<Note> {

  public noteType = NoteType;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.valid();
      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.addNote(this.data);
      } else {
        this.data = await this.participantRestApiService.updateNote(this.data, null, {id: this.data.id});
      }
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.removeNote({id: this.data.id});
    });
  }

  public valid(): void {
    if (this.data.name || this.data.phone || this.data.email || (this.data as AgentNote).organization || (this.data as TrainerNote).club || (this.data as TrainerNote).age) {
      return;
    }
    throw new ClientError('noneFieldsAreFilled');
  }

}
