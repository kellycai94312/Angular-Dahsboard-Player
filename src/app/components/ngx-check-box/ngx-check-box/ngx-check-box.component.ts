import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ngx-check-box',
  templateUrl: './ngx-check-box.component.html',
  styleUrls: ['./ngx-check-box.component.scss']
})
export class NgxCheckBoxComponent {

  @Input()
  public value: boolean;

  @Output()
  public valueChange: EventEmitter<boolean>;

  constructor() {
    this.valueChange = new EventEmitter<boolean>();
  }

  public onValueChanged(val: boolean) {
    this.valueChange.emit(val);
  }

}
