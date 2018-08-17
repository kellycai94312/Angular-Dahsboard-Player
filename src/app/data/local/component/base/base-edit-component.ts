import {Input, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {IBaseEditComponent} from './ibase-edit-component';

export abstract class BaseEditComponent<T> implements OnInit, IBaseEditComponent {

  @Input()
  public manualInitialization: boolean;

  @Input()
  public data: T;

  protected constructor(protected participantRestApiService: ParticipantRestApiService,
                        protected appHelper: AppHelper) {
  }

  async ngOnInit() {
    if (!this.manualInitialization) {
      await this.initialize(this.data);
    }
  }

  public async initialize(obj: T): Promise<boolean> {
    this.data = obj;
    return true;
  }

  public abstract async onSave(): Promise<boolean>;

  public abstract async onRemove(): Promise<boolean>;

}
