import {Component, ViewChild} from '@angular/core';
import {BasePersonSettingsComponent} from '../../model/base-person-settings-component';
import {BaseEditComponent} from '../../../../../data/local/component/base/base-edit-component';
import {Person} from '../../../../../data/remote/model/person';
import {AuthorizationService} from '../../../../../shared/authorization.service';
import {BasicPersonComponent} from '../../../../../module/person/basic-person/basic-person/basic-person.component';

@Component({
  selector: 'app-basic-person-settings',
  templateUrl: './basic-person-settings.component.html',
  styleUrls: ['./basic-person-settings.component.scss']
})
export class BasicPersonSettingsComponent extends BasePersonSettingsComponent {

  @ViewChild(BasicPersonComponent, { static: false })
  public component: BaseEditComponent<Person>;

  constructor(authorizationService: AuthorizationService) {
    super(authorizationService);
    this.allowSave = true;
  }

  public async onSave(): Promise<boolean> {
    const result = super.onSave();
    this.authorizationService.personSubject.next(this.component.data);
    return result;
  }

}
