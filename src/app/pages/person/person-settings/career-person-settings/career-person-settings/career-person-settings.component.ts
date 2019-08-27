import {Component, ViewChild} from '@angular/core';
import {BasePersonSettingsComponent} from '../../model/base-person-settings-component';
import {BaseEditComponent} from '../../../../../data/local/component/base/base-edit-component';
import {Person} from '../../../../../data/remote/model/person';
import {CareerPersonComponent} from '../../../../../module/person/career-person/career-person/career-person.component';
import {AuthorizationService} from '../../../../../shared/authorization.service';

@Component({
  selector: 'app-career-person-settings',
  templateUrl: './career-person-settings.component.html',
  styleUrls: ['./career-person-settings.component.scss']
})
export class CareerPersonSettingsComponent extends BasePersonSettingsComponent {

  @ViewChild(CareerPersonComponent)
  public component: BaseEditComponent<Person>;

  constructor(authorizationService: AuthorizationService) {
    super(authorizationService);
    this.allowRemove = true;
    this.allowSave = true;
  }

}
