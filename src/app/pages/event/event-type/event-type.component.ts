import {Component, OnInit} from '@angular/core';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {TrainingDiscriminator} from '../../../data/remote/model/training/base/training-discriminator';
import {TranslateObjectService} from '../../../shared/translate-object.service';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.scss']
})
export class EventTypeComponent implements OnInit {

  public eventTypes: NameWrapper<TrainingDiscriminator>[];
  public selectedEventType: NameWrapper<TrainingDiscriminator>;

  constructor(private _translateObjectService: TranslateObjectService) {
  }

  async ngOnInit(): Promise<void> {
    this.eventTypes = await this._translateObjectService.getTranslatedEnumCollection<TrainingDiscriminator>(TrainingDiscriminator, 'TrainingDiscriminator');
    this.selectedEventType = this.eventTypes[0];
  }

}
