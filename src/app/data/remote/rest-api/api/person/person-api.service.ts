import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {Person} from '../../../model/person';
import {PersonQuery} from '../../query/person-query';
import {PageQuery} from '../../page-query';
import {MedicalExamination} from '../../../model/person/medical-examination';
import {GroupNews} from '../../../model/group/news/group-news';
import {PersonNews} from '../../../model/group/news/person-news';
import {BooleanWrapper} from '../../../bean/wrapper/boolean-wrapper';
import {map} from 'rxjs/operators';
import {Dialogue} from '../../../model/chat/conversation/dialogue';
import {GroupPersonJob} from '../../../model/group/group-person-job';
import {SingleAttributeWrapper} from '../../../bean/wrapper/single-attribute-wrapper';
import {plainToClass} from 'class-transformer';
import {PersonContact} from '../../../model/person/person-contact';

@Injectable({
  providedIn: 'root'
})
export class PersonApiService {
  private readonly _basePath = `${environment.restUrl}/person`;

  constructor(private _apiService: ApiService) {
  }

  public getPerson(personId: number): Observable<Person> {
    return this._apiService.getValue(Person, `${this._basePath}/${personId}`);
  }

  public getPersons<T extends Person>(query: PersonQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(Person, this._basePath, query) as Observable<PageContainer<T>>;
  }

  public createPerson<T extends Person>(value: T): Observable<T> {
    return this._apiService.createValue(Person, this._basePath, value) as Observable<T>;
  }

  public updatePerson<T extends Person>(value: T): Observable<T> {
    return this._apiService.updateValue(Person, `${this._basePath}/${value.id}`, value) as Observable<T>;
  }

  public savePerson<T extends Person>(value: T): Observable<T> {
    return this._apiService.saveValue(Person, this._basePath, value) as Observable<T>;
  }

  public removePerson<T extends Person>(value: T): Observable<T> {
    return this._apiService.removeValue(Person, `${this._basePath}/${value.id}`) as Observable<T>;
  }

  public canEditPerson(person: Person): Observable<boolean> {
    return this._apiService.getValue(BooleanWrapper, `${this._basePath}/${person.id}/canEdit`).pipe(map(x => x.value));
  }

  //#region Medical examination

  public getMedicalExaminations(person: Person,
                                query: PageQuery & { sportTypeId?: number }): Observable<PageContainer<MedicalExamination>> {
    return this._apiService.getPageContainer(MedicalExamination, `${this._basePath}/${person.id}/medicalExamination`, query) as Observable<PageContainer<MedicalExamination>>;
  }

  public createMedicalExamination(person: Person,
                                  value: MedicalExamination): Observable<MedicalExamination> {
    return this._apiService.createValue(MedicalExamination, `${this._basePath}/${person.id}/medicalExamination`, value) as Observable<MedicalExamination>;
  }

  public updateMedicalExamination(person: Person,
                                  value: MedicalExamination): Observable<MedicalExamination> {
    return this._apiService.createValue(MedicalExamination, `${this._basePath}/${person.id}/medicalExamination/${value.id}`, value) as Observable<MedicalExamination>;
  }

  public saveMedicalExamination(person: Person,
                                value: MedicalExamination): Observable<MedicalExamination> {
    if (value.id) {
      return this.updateMedicalExamination(person, value);
    }
    return this.createMedicalExamination(person, value);
  }

  public removeMedicalExamination(person: Person,
                                  value: MedicalExamination): Observable<MedicalExamination> {
    return this._apiService.removeValue(MedicalExamination, `${this._basePath}/${person.id}/medicalExamination/${value.id}`) as Observable<MedicalExamination>;
  }

  //#endregion

  //#region News

  public getGroupNews(query?: PageQuery): Observable<PageContainer<GroupNews>> {
    return this._apiService.getPageContainer(GroupNews, `${this._basePath}/news`, query) as Observable<PageContainer<GroupNews>>;
  }

  public getPersonNews(person: Person, query?: PageQuery): Observable<PageContainer<PersonNews>> {
    return this._apiService.getPageContainer(PersonNews, `${this._basePath}/${person.id}/news`, query) as Observable<PageContainer<PersonNews>>;
  }

  public getPersonNewsById(person: Person, personNews: PersonNews): Observable<PersonNews> {
    return this._apiService.getValue(PersonNews, `${this._basePath}/${person.id}/news/${personNews.id}`) as Observable<PersonNews>;
  }

  public createPersonNews(personNews: PersonNews): Observable<PersonNews> {
    return this._apiService.createValue(PersonNews, `${this._basePath}/news`, personNews) as Observable<PersonNews>;
  }

  public updatePersonNews(personNews: PersonNews): Observable<PersonNews> {
    return this._apiService.updateValue(PersonNews, `${this._basePath}/news/${personNews.id}`, personNews) as Observable<PersonNews>;
  }

  public savePersonNews(personNews: PersonNews): Observable<PersonNews> {
    if (personNews.id) {
      return this.updatePersonNews(personNews);
    }
    return this.createPersonNews(personNews);
  }

  public removePersonNews(personNews: PersonNews): Observable<PersonNews> {
    return this._apiService.removeValue(PersonNews, `${this._basePath}/news/${personNews.id}`) as Observable<PersonNews>;
  }

  //#endregion

  //#region Representative

  public getPersonDependant<T extends Person>(person: Person): Observable<T[]> {
    return this._apiService.getValues(Person, `${this._basePath}/${person.id}/dependant`) as Observable<T[]>;
  }

  public getPersonRepresentatives<T extends Person>(person: Person): Observable<T[]> {
    return this._apiService.getValues(Person, `${this._basePath}/${person.id}/representative`) as Observable<T[]>;
  }

  //#endregion

  //#region Contact

  public getPersonContacts(person: Person): Observable<PersonContact[]> {
    return this._apiService.getValues(PersonContact, `${this._basePath}/${person.id}/contact`);
  }

  public createContact(person: Person, value: PersonContact): Observable<PersonContact> {
    return this._apiService.createValue(PersonContact, `${this._basePath}/${person.id}/contact`, value) as Observable<PersonContact>;
  }

  public updateContact(person: Person, value: PersonContact): Observable<PersonContact> {
    return this._apiService.updateValue(PersonContact, `${this._basePath}/${person.id}/contact/${value.id}`, value) as Observable<PersonContact>;
  }

  public saveContact(person: Person, value: PersonContact): Observable<PersonContact> {
    if (value.id) {
      return this.updateContact(person, value);
    }
    return this.createContact(person, value);
  }

  public removeContact(person: Person, value: PersonContact): Observable<PersonContact> {
    return this._apiService.removeValue(PersonContact, `${this._basePath}/${person.id}/contact/${value.id}`) as Observable<PersonContact>;
  }

  //#endregion

  //#region Dialogue

  public getDialogue(person: Person): Observable<Dialogue> {
    return this._apiService.getValue(Dialogue, `${this._basePath}/${person.id}/dialogue`);
  }

  //#endregion

  //region Group person job

  public getGroupPersonJob(person: Person): Observable<GroupPersonJob> {
    return this._apiService.getValue(SingleAttributeWrapper, `${this._basePath}/${person.id}/job`).pipe(map(value => plainToClass(GroupPersonJob, value.value)));
  }

  public updateGroupPersonJob(person: Person, value: GroupPersonJob): Observable<GroupPersonJob> {
    return this._apiService.createValue(GroupPersonJob, `${this._basePath}/${person.id}/job`, value) as Observable<GroupPersonJob>;
  }

  public removeGroupPersonJob(person: Person): Observable<GroupPersonJob> {
    return this._apiService.removeValue(GroupPersonJob, `${this._basePath}/${person.id}/job`) as Observable<GroupPersonJob>;
  }

  //endregion
}
