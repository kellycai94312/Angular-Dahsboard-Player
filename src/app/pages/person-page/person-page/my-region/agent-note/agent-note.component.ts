import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { PropertyConstant } from '../../../../../data/local/property-constant';
import { MyRegionService } from '../my-region.service';
import { NoteType } from '../../../../../data/remote/model/note/base/note-type';

@Component({
  selector: 'app-agent-note',
  templateUrl: './agent-note.component.html',
  styleUrls: ['./agent-note.component.scss']
})
export class AgentNoteComponent implements OnInit, AfterViewInit {

  @ViewChild('name')
  public name: DxTextBoxComponent;

  @ViewChild('phone')
  public phone: DxTextBoxComponent;

  @ViewChild('email')
  public email: DxTextBoxComponent;

  @ViewChild('organization')
  public organization: DxTextBoxComponent;

  constructor(public myRegionService: MyRegionService) {
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    this.myRegionService.initialize(NoteType.AGENT);
    this.name.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setName(event));
    this.phone.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setPhone(event));
    this.email.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setEmail(event));
    this.organization.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setOrganization(event));
  }

}
