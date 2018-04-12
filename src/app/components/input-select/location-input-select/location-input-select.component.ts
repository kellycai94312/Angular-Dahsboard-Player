import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from "../../../data/remote/model/location";
import { ParticipantRestApiService } from "../../../data/remote/rest-api/participant-rest-api.service";
import { PropertyConstant } from "../../../data/local/property-constant";

@Component({
  selector: 'app-location-input-select',
  templateUrl: './location-input-select.component.html',
  styleUrls: ['./location-input-select.component.scss']
})
export class LocationInputSelectComponent implements OnInit {

  @Output()
  public onChange;
  public pageSize: number;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.pageSize = PropertyConstant.pageSize;
    this.onChange = new EventEmitter<Location>();
  }

  ngOnInit() {
  }

  getKey(location: Location) {
    return location.id;
  }

  getName(location: Location) {
    return location.name;
  }

  loadLocations = async (from: number, searchText: string) => {
    return this._participantRestApiService.getLocations({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  onSelect(e: any) {
    this.onChange.emit(e);
  }

}
