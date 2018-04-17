import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DxTextBoxComponent} from 'devextreme-angular';
import {MyRegionService} from '../my-region.service';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {NoteType} from '../../../../../data/remote/model/note/base/note-type';

@Component({
  selector: 'app-trainer-note',
  templateUrl: './trainer-note.component.html',
  styleUrls: ['./trainer-note.component.scss']
})
export class TrainerNoteComponent implements OnInit, AfterViewInit {

  @ViewChild('name')
  public name: DxTextBoxComponent;

  @ViewChild('phone')
  public phone: DxTextBoxComponent;

  @ViewChild('email')
  public email: DxTextBoxComponent;

  @ViewChild('club')
  public club: DxTextBoxComponent;

  @ViewChild('age')
  public age: DxTextBoxComponent;

  constructor(public myRegionService: MyRegionService) {
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.myRegionService.initialize(NoteType.TRAINER);

    this.name.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setName(event));
    this.phone.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setPhone(event));
    this.email.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setEmail(event));
    this.club.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setClub(event));
    this.age.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setAge(event));
  }
}
