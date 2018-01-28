import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ImageType} from '../../../data/remote/model/image-type';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input()
  public person: Person;

  public imageLogoUrl: string;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
  }

  ngOnInit() {
    this.imageLogoUrl = this._participantRestApiService.getImageUrl({
      clazz: 'person',
      id: this.person.id,
      type: ImageType.LOGO,
      full: false
    });
  }

}
