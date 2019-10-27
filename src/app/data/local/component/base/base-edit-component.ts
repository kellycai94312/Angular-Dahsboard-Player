import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { AppHelper } from 'app/utils/app-helper';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from './base-component';
import { IBaseEditComponent } from './ibase-edit-component';

export abstract class BaseEditComponent<T> extends BaseComponent<T> implements OnInit, OnDestroy, IBaseEditComponent {

  public readonly formGroup = new FormGroup({});
  private readonly _validFromGroupSubject = new BehaviorSubject<boolean>(false);
  private readonly _destroyComponentSubject = new Subject<void>();

  public get validFromGroup$(): Observable<boolean> {
    return this._validFromGroupSubject.asObservable();
  }

  public get destroyComponent$(): Observable<void> {
    return this._destroyComponentSubject.asObservable();
  }

  protected constructor(protected participantRestApiService: ParticipantRestApiService,
                        protected appHelper: AppHelper) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.formGroup.statusChanges
      .pipe(takeUntil(this._destroyComponentSubject))
      .subscribe(() => {
        this._validFromGroupSubject.next(this.formGroup.valid);
      });
    this.formGroup.updateValueAndValidity();
  }

  public ngOnDestroy(): void {
    this._destroyComponentSubject.next();
    this._destroyComponentSubject.complete();
  }

  public abstract async onSave(): Promise<boolean>;

  public abstract async onRemove(): Promise<boolean>;

  public get isNew(): boolean {
    return this.appHelper.isNewObject(this.data as any);
  }

}
