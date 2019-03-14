import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SubgroupTemplate} from '../../../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {skipWhile} from 'rxjs/operators';

@Injectable()
export class SubgroupService {

  private readonly _subgroupTemplateSubject: BehaviorSubject<SubgroupTemplate>;

  constructor() {
    this._subgroupTemplateSubject = new BehaviorSubject<SubgroupTemplate>(void 0);
  }

  public updateSubgroupTemplate(subgroupTemplate: SubgroupTemplate) {
    this._subgroupTemplateSubject.next(subgroupTemplate);
  }

  public subgroupTemplateChanged(): Observable<SubgroupTemplate> {
    return this._subgroupTemplateSubject.asObservable().pipe(skipWhile(x => !x));
  }

}
