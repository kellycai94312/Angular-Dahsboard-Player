import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Person} from '../../../../data/remote/model/person';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {takeWhile} from 'rxjs/operators';

export abstract class BasePersonSettingsComponent implements OnInit, OnDestroy {

  @ViewChild(BaseEditComponent)
  public abstract component: BaseEditComponent<Person>;

  public person: Person;
  public allowRemove: boolean;
  public allowSave: boolean;
  public _notDestroyed = true;

  public get canSave(): boolean {
    return !!this.onSave && this.allowSave;
  }

  public get canRemove(): boolean {
    return !!this.onRemove && this.allowRemove;
  }

  protected constructor(public authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.authorizationService.person$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => {
        this.person = value;
        this.updatedPerson(value);
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  public async onRemove(): Promise<boolean> {
    return await this.component.onRemove();
  }

  public async onSave(): Promise<boolean> {
    return await this.component.onSave();
  }

  public updatedPerson(person: Person): void {
  }

}
