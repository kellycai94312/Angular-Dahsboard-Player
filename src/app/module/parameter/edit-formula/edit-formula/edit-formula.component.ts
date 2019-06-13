import {Component, ComponentFactoryResolver, forwardRef, Inject} from '@angular/core';
import {BaseParameter} from '../../../../data/remote/model/parameter/base-parameter';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParameterApiService} from '../../../../data/remote/rest-api/api/parameter/parameter-api.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
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

  public readonly mathOperations: NameWrapper<string>[];
  public parameters: BaseParameter[] = [];
  public formulaParameters: NameWrapper<string>[] = [];

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
      {name: '+', data: '+'}
    ];
  }

  protected async initializeComponent(data: BaseParameter): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        if (!this.isNew) {
          this.parameters = await this._parameterApiService.getFormulaParameters(data).toPromise();
          const formulaParameters = this._getFormulaParameters(this.data.formula);
          formulaParameters
            .filter(x => x.data.indexOf('$') > -1)
            .forEach(value => {
              const nameWrapper = this._getNameWrapperParameter(value.data);
              if (nameWrapper) {
                Object.assign(value, nameWrapper);
              }
            });
          this.formulaParameters = formulaParameters;
        }
      });
    }
    return result;
  }

  public onClickParameter(item: BaseParameter): void {
    const nameWrapper = this._getNameWrapperParameter(`$${item.id}`);
    if (nameWrapper) {
      this.formulaParameters.push(nameWrapper);
    }
  }

  public onRemoveParameter(item: BaseParameter): void {
    this.parameters.splice(this.parameters.indexOf(item), 1);
  }

  public onRemoveFormulaParameter(item: NameWrapper<string>): void {
    this.formulaParameters.splice(this.formulaParameters.indexOf(item), 1);
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
    this.formulaParameters.push(item);
  }

  async onRemove(): Promise<boolean> {
    return false;
  }

  async onSave(): Promise<boolean> {
    this.data.formula = this.formulaParameters.map(x => x.data).join('');
    return await this.appHelper.trySave(async () => {
      this.parameters = await this._parameterApiService.updateFormulaParameters(this.data, new ListRequest<IdRequest>(this.parameters.map(x => new IdRequest(x.id)))).toPromise();
    });
  }

  private _getFormulaParameters(formula: string): NameWrapper<string>[] {
    if (!formula) {
      return [];
    }
    const result: NameWrapper<string>[] = [];
    const pattern = `([$]\\d+)|[${this.mathOperations.map(x => x.data).join(',')}]`;
    const regExp = new RegExp(pattern, 'gi');
    let regExpExecArray: RegExpExecArray;
    do {
      regExpExecArray = regExp.exec(formula);
      if (regExpExecArray) {
        result.push({name: '' + regExpExecArray[0], data: '' + regExpExecArray[0]});
      }
    } while (regExpExecArray);
    return result;
  }

  private _getNameWrapperParameter(id: string): NameWrapper<string> {
    const parameter = this.parameters.find(x => `$${x.id}` === id);
    return parameter ? {name: parameter.name, data: id} : void 0;
  }

}
