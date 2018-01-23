import { Component, Input, OnInit, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-select',
  templateUrl: './modal-select.component.html',
  styleUrls: ['./modal-select.component.scss']
})
export class ModalSelectComponent implements OnInit {

  @Input()
  public header: string;

  @Input()
  public field: string;

  @Input()
  public defaultData: any[];

  @Input()
  public selectedData: any[];

  @Input()
  public component: Type<any>;

  @Input()
  public onSearch: Function;

  @Input()
  public onSave: Function;

  private subject: Subject<any>;

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.subject = new Subject();
  }

  onRemove(obj: any) {
    this.selectedData.splice(this.selectedData.indexOf(obj), 1);
    this.defaultData.push(obj);
    this.subject.next();
  }

  onSelect = (typing: string, obj: any) => {
    this.defaultData.splice(this.defaultData.indexOf(obj), 1);
    this.selectedData.push(obj);
    return this.onSearch(typing);
  }


}
