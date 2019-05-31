import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {EventType} from '../../../../data/remote/model/event/base/event-type';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {FormControl, Validators} from '@angular/forms';
import {BaseEventApiService} from '../../../../data/remote/rest-api/api/event/base-event-api/base-event-api.service';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditEventPersonsComponent} from '../../edit-event-persons/edit-event-persons/edit-event-persons.component';
import {UtilService} from '../../../../services/util/util.service';

@Component({
  selector: 'app-edit-base-event',
  templateUrl: './edit-base-event.component.html',
  styleUrls: ['./edit-base-event.component.scss'],
  providers: [BaseEventApiService]
})
export class EditBaseEventComponent<T extends BaseEvent> extends BaseEditComponent<T> implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;
  public eventTypeNgxSelect: NgxSelect;
  public nameNgxInput: NgxInput;
  public descriptionNgxInput: NgxInput;

  constructor(private _baseEventApiService: BaseEventApiService,
              private _ngxModalService: NgxModalService,
              private _utilService: UtilService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: T): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.eventTypeNgxSelect = new NgxSelect();
        this.eventTypeNgxSelect.labelTranslation = 'eventType';
        this.eventTypeNgxSelect.display = 'name';
        this.eventTypeNgxSelect.required = true;
        this.eventTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<EventType>(EventType, 'EventTypeEnum');
        this.eventTypeNgxSelect.control = new FormControl(this.eventTypeNgxSelect.items[0], [Validators.required]);

        this.nameNgxInput = new NgxInput();
        this.nameNgxInput.labelTranslation = 'name';
        this.nameNgxInput.required = true;
        this.nameNgxInput.control = new FormControl(data.name, [Validators.required]);

        this.descriptionNgxInput = new NgxInput();
        this.descriptionNgxInput.type = NgxInputType.TEXTAREA;
        this.descriptionNgxInput.labelTranslation = 'description';
        this.descriptionNgxInput.rows = 4;
        this.descriptionNgxInput.control = new FormControl(data.description);

        if (!this.isNew) {
          this.eventTypeNgxSelect.control.setValue(this.eventTypeNgxSelect.items.find(x => x.data === data.discriminator));
          this.eventTypeNgxSelect.control.disable();
        }
      });
    }
    return result;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._baseEventApiService.removeEvent(this.data).toPromise();
    });
  }

  async onSave(): Promise<boolean> {
    this.data.discriminator = this.eventTypeNgxSelect.control.value.data;
    this.data.name = this.nameNgxInput.control.value;
    this.data.description = this.descriptionNgxInput.control.value;
    this.data.startDate = this.appHelper.getGmtDate(this.data.startDate);
    this.data.finishDate = this.appHelper.getGmtDate(this.data.finishDate);

    return await this.appHelper.trySave(async () => {
      this.data = await this._baseEventApiService.saveEvent(this.data).toPromise();
    });
  }

  public async showAdvancedMode(): Promise<boolean> {
    const modal = this._ngxModalService.open();
    await modal.componentInstance.initializeBody(EditEventPersonsComponent, async component => {
      component.initialize(this._utilService.clone(this.data)).subscribe();
    }, {componentFactoryResolver: this._componentFactoryResolver});
    return await this._ngxModalService.awaitModalResult(modal);
  }

}
