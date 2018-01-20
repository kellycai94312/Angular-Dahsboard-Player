import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../../data/remote/model/group/base/group';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { ImageType } from '../../../data/remote/model/image-type';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit {

  @Input()
  public group: Group;

  public imageUrl: string;

  public groupUrl: string;

  constructor(private  _participantRestApiService: ParticipantRestApiService) {
  }

  ngOnInit() {
    if (this.group != null) {
      this.imageUrl = this._participantRestApiService.getImageUrl({
        clazz: 'group',
        id: this.group.id,
        type: ImageType.LOGO
      });
      this.groupUrl = `/group/${this.group.id}`;
    }
  }

}
