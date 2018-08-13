import {Component, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../../group.service';

@Component({
  selector: 'app-group-connections',
  templateUrl: './group-connections.component.html',
  styleUrls: ['./group-connections.component.scss']
})
export class GroupConnectionsComponent implements OnInit {

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService) {
  }

  ngOnInit() {
  }

}
