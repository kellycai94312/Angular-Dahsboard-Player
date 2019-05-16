import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-html-editor',
  templateUrl: './ngx-html-editor.component.html',
  styleUrls: ['./ngx-html-editor.component.scss']
})
export class NgxHtmlEditorComponent {

  get data(): any {
    return this._data;
  }

  @Input()
  set data(value: any) {
    value = value || '';
    this._data = value;
  }

  @Output()
  public readonly dataChange = new EventEmitter<string>();

  private _data: any;

  constructor(public translateService: TranslateService) {
  }

  public async onNgModelChanged(data: any): Promise<void> {
    this.dataChange.emit(data);
  }

}
