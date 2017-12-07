import { Component, OnInit } from '@angular/core';
import { SexEnum } from '../../../data/remote/misc/sex-enum';
import { TranslateService } from '@ngx-translate/core';
import { Sex } from '../../../data/local/sex';
import { TranslateObjectService } from '../../../shared/translate-object.service';
import { Person } from '../../../data/remote/model/person';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { IdentifiedObject } from '../../../data/remote/base/identified-object';

@Component({
  selector: 'app-registration-person-page',
  templateUrl: './registration-person-page.component.html',
  styleUrls: ['./registration-person-page.component.scss']
})
export class RegistrationPersonPageComponent implements OnInit {

  public person: Person;

  public dateMin: Date;
  public dateMax: Date;

  private sexValues: Array<Sex>;
  public selectedSex: Sex;

  constructor(public translate: TranslateService,
              private translateObjectService: TranslateObjectService,
              private participantRestApiService: ParticipantRestApiService,
              private localStorageService: LocalStorageService) {
    this.person = new Person();

    this.dateMin = new Date();
    this.dateMin.setFullYear(this.dateMin.getFullYear() - 125);

    this.dateMax = new Date();
    this.dateMax.setFullYear(this.dateMax.getFullYear() - 3);
  }

  async ngOnInit() {
    const temp = Object.keys(SexEnum).filter(x => !isNaN(Number(SexEnum[x]))).map(x => SexEnum[x]);
    this.sexValues = [];

    for (let i = 0; i < temp.length; i++) {
      const sex = new Sex();
      sex.name = await this.translateObjectService.getTranslateName('SexEnum', SexEnum[temp[i]].toString());
      sex.sexEnum = temp[i];
      this.sexValues.push(sex);
    }
    const userId = new IdentifiedObject();
    userId.id = this.localStorageService.getCurrentUserId();
    this.person.user = await this.participantRestApiService.getUser(userId);
  }

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      // TODO
      this.person.sex = this.selectedSex.sexEnum;
      const bewPerson = await this.participantRestApiService.createPerson(this.person);

    }
  }
}
