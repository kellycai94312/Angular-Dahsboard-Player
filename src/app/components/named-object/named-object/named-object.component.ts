import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NamedObject} from '../../../data/remote/base/named-object';
import {NgxInput} from '../../../module/ngx/ngx-input/model/ngx-input';
import {FormGroup, Validators} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {NgxInputType} from '../../../module/ngx/ngx-input/model/ngx-input-type';

@Component({
  selector: 'app-named-object',
  templateUrl: './named-object.component.html',
  styleUrls: ['./named-object.component.scss']
})
export class NamedObjectComponent<T extends NamedObject> implements OnInit, OnDestroy {

  @Input()
  public data: T;

  public readonly nameNgxInput = new NgxInput();
  public readonly descriptionNgxInput = new NgxInput();
  public readonly formGroup = new FormGroup({});
  private _notDestroyed = true;

  constructor() {
    this.data = <T>{};
  }

  public ngOnInit(): void {
    this.nameNgxInput.labelTranslation = 'name';
    this.nameNgxInput.required = true;
    this.nameNgxInput.control.setValidators(Validators.required);
    this.nameNgxInput.control.setValue(this.data.name);

    this.descriptionNgxInput.labelTranslation = 'description';
    this.descriptionNgxInput.type = NgxInputType.TEXTAREA;
    this.descriptionNgxInput.control.setValue(this.data.description);

    this.formGroup.setControl('name', this.nameNgxInput.control);
    this.formGroup.setControl('description', this.descriptionNgxInput.control);

    this.formGroup.valueChanges
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe((value) => {
        this.data.name = value.name;
        this.data.description = value.description;
      });
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

  public valid(): boolean {
    return this.formGroup.valid;
  }

}
