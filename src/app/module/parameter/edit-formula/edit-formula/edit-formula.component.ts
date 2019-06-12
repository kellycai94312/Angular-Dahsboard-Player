import {Component, ComponentFactoryResolver, forwardRef, Inject} from '@angular/core';
import {BaseParameter} from '../../../../data/remote/model/parameter/base-parameter';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParameterApiService} from '../../../../data/remote/rest-api/api/parameter/parameter-api.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {ParameterWindowService} from '../../../../services/windows/parameter-window/parameter-window.service';
import {NameWrapper} from '../../../../data/local/name-wrapper';

@Component({
  selector: 'app-edit-formula',
  templateUrl: './edit-formula.component.html',
  styleUrls: ['./edit-formula.component.scss'],
  providers: [ParameterApiService]
})
export class EditFormulaComponent extends BaseEditComponent<BaseParameter> {

  public readonly formulaNgxInput = new NgxInput();
  public parameters: BaseParameter[] = [];
  public readonly mathOperations: NameWrapper<string>[];

  constructor(private _parameterApiService: ParameterApiService,
              // TODO: ParameterWindowService can't inject without forwardRef()
              @Inject(forwardRef(() => ParameterWindowService))
              private _parameterWindowService: ParameterWindowService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.mathOperations = [
      {name: '/', data: '/'},
      {name: '*', data: '*'},
      {name: '-', data: '-'},
      {name: '+', data: '+'},
      {name: 'sqrt', data: 'sqrt()'},
      {name: 'pow', data: 'pow()'},
    ];
  }

  protected async initializeComponent(data: BaseParameter): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.formulaNgxInput.labelTranslation = 'formula';
        this.formulaNgxInput.type = NgxInputType.TEXTAREA;
        this.formulaNgxInput.control.setValue(data.formula);

        if (!this.isNew) {
          this.parameters = await this._parameterApiService.getFormulaParameters(data).toPromise();
        }
      });
    }
    return result;
  }

  public onClickParameter(item: BaseParameter): void {
    this.formulaNgxInput.control.setValue(`${this.formulaNgxInput.control.value}$${item.id}`);
  }

  public onRemoveParameter(item: BaseParameter): void {
    this.parameters.splice(this.parameters.indexOf(item), 1);
  }

  public async onEditParameters(): Promise<void> {
    const dialogResult = await this._parameterWindowService.openEditParameters(this.data, this.parameters, {
      componentFactoryResolver: this._componentFactoryResolver,
      compare: (first, second) => first.id == second.id
    });
    if (dialogResult.result) {
      this.parameters = dialogResult.data;
    }
  }

  public onAddMathOperation(item: NameWrapper<string>): void {
    this.formulaNgxInput.control.setValue(`${this.formulaNgxInput.control.value}${item.data}`);
  }

  async onRemove(): Promise<boolean> {
    return false;
  }

  async onSave(): Promise<boolean> {
    this.data.formula = this.formulaNgxInput.control.value;
    return await this.appHelper.trySave(async () => {
      this.parameters = await this._parameterApiService.updateFormulaParameters(this.data, new ListRequest<IdRequest>(this.parameters.map(x => new IdRequest(x.id)))).toPromise();
    });
  }

}
