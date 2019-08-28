import {Component} from '@angular/core';
import {BasePersonSettingsComponent} from '../../model/base-person-settings-component';
import {BaseEditComponent} from '../../../../../data/local/component/base/base-edit-component';
import {Person} from '../../../../../data/remote/model/person';
import {AuthorizationService} from '../../../../../shared/authorization.service';

@Component({
  selector: 'app-contacts-person-settings',
  templateUrl: './contacts-person-settings.component.html',
  styleUrls: ['./contacts-person-settings.component.scss']
})
export class ContactsPersonSettingsComponent extends BasePersonSettingsComponent {
  public component: BaseEditComponent<Person>;

  constructor(authorizationService: AuthorizationService) {
    super(authorizationService);
  }
}
