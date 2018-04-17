import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DxTextBoxComponent} from 'devextreme-angular';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {NoteType} from '../../../../../data/remote/model/note/base/note-type';
import {MyRegionService} from '../my-region.service';

@Component({
  selector: 'app-school-note',
  templateUrl: './school-note.component.html',
  styleUrls: ['./school-note.component.scss']
})
export class SchoolNoteComponent implements OnInit, AfterViewInit {

  @ViewChild('name')
  public name: DxTextBoxComponent;

  @ViewChild('phone')
  public phone: DxTextBoxComponent;

  @ViewChild('email')
  public email: DxTextBoxComponent;

  constructor(public myRegionService: MyRegionService) {
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.myRegionService.initialize(NoteType.SCHOOL);

    this.name.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setName(event));
    this.phone.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setPhone(event));
    this.email.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setEmail(event));
  }
}
