import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  public readonly editor = ClassicEditor;
  private _data: any;

  public onNgModelChanged(data: any): void {
    this.dataChange.emit(data);
  }

}
