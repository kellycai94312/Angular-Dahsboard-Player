import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

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
  public onSearch: Function;

  @Input()
  public onSelect: Function;

  @Input()
  public onRemove: Function;

  @Input()
  public onSave: Function;

  @Input()
  private subject: Subject<any>;

  ngOnInit(): void {
  }

}
