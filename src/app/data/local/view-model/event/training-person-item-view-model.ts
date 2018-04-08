import {TrainingPersonViewModel} from './training-person-view-model';
import {Input} from '@angular/core';
import {SportRole} from '../../../remote/model/sport-role';

export class TrainingPersonItemViewModel extends TrainingPersonViewModel {

  @Input()
  public numbers: number[];

  @Input()
  public sportRoles: SportRole[];

  @Input()
  public assigned: boolean;

  @Input()
  public allowEdit: boolean;

}
