import {Component, Input} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonRefereeCategory} from '../../../../data/remote/model/referee-category/person-referee-category';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {Person} from '../../../../data/remote/model/person';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {Document} from '../../../../data/remote/model/file/document/document';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';

// @Component({
//   selector: 'app-edit-referee-category',
//   templateUrl: './edit-referee-category.component.html',
//   styleUrls: ['./edit-referee-category.component.scss']
// })
export class EditRefereeCategoryComponent extends BaseEditComponent<PersonRefereeCategory> {

  public readonly propertyConstant = PropertyConstant;

  @Input()
  public person;

  @Input()
  public sportType;

  private _document: Document;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);

    this._document = new Document();
    this._document.clazz = FileClass.PERSON_REFEREE_CATEGORY;
  }

  async initialize(obj: PersonRefereeCategory): Promise<boolean> {
    await super.initialize(obj);
    this._document.objectId = obj.id;
    return await this.appHelper.tryLoad(async () => {
      if (this.data && this.data.id) {
        const documents = await this.participantRestApiService.getDocuments({clazz: FileClass.PERSON_REFEREE_CATEGORY, objectId: this.data.id, count: 1});
        if (documents.list.length) {
          this._document = documents.list[0];
        }
      }
    });
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.assignDate = this.appHelper.getGmtDate(this.data.assignDate);
      this.data = await this.participantRestApiService.updatePersonRefereeCategory(this.data, {}, {
        personId: this.person.id,
        sportTypeId: this.sportType.id
      });
      this._document.objectId = this.data.id;
    });
  }

  loadPersons = async (from: number, searchText: string) => {
    return this.participantRestApiService.getPersons({name: searchText});
  };

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: Person) {
    return item.firstName + ' ' + item.lastName;
  }

  public editDocument = async () => {
    // const modal = this._ngxModalService.open();
    // modal.componentInstance.titleKey = 'edit';
    // await modal.componentInstance.initializeBody(EditDocumentComponent, async component => {
    //   await component.initialize(this.appHelper.cloneObject(this._document));
    //
    //   modal.componentInstance.splitButtonItems = [
    //     this._ngxModalService.saveSplitItemButton(async () => {
    //       await this._ngxModalService.save(modal, component);
    //     }),
    //     this._ngxModalService.removeSplitItemButton(async () => {
    //       await this._ngxModalService.remove(modal, component);
    //     })
    //   ];
    //
    //   modal.result.then(async x => {
    //   }, async reason => {
    //     this._document = this.appHelper.cloneObject(component.data);
    //   });
    // });
  };

}
