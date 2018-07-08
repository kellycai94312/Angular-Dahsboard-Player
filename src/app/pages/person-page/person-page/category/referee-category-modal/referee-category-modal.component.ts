import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IdentifiedObject} from '../../../../../data/remote/base/identified-object';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {Person} from '../../../../../data/remote/model/person';
import {SportType} from '../../../../../data/remote/model/sport-type';
import {FileClass} from '../../../../../data/remote/model/file/base/file-class';
import {AppHelper} from '../../../../../utils/app-helper';
import {DocumentType} from '../../../../../data/remote/model/file/document/document-type';
import {Document} from '../../../../../data/remote/model/file/document/document';
import {PersonRefereeCategoryViewModel} from '../../../../../data/local/view-model/referee-category/person-referee-category-view-model';

@Component({
  selector: 'app-referee-category-modal',
  templateUrl: './referee-category-modal.component.html',
  styleUrls: ['./referee-category-modal.component.scss']
})
export class RefereeCategoryModalComponent {

  @Input()
  public personRefereeCategoryViewModel: PersonRefereeCategoryViewModel;

  @Input()
  public person: Person;

  @Input()
  public sportType: SportType;

  public selectedFileName: string;
  public readonly documentTypes: DocumentType[];

  private _file: File;

  constructor(public modal: NgbActiveModal,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.documentTypes = Object.keys(DocumentType).filter(e => parseInt(e, 10) >= 0).map(x => DocumentType[x]);
  }

  public initialize(personRefereeCategoryViewModel: PersonRefereeCategoryViewModel, person: Person, sportType: SportType) {
    this.personRefereeCategoryViewModel = personRefereeCategoryViewModel;
    if (this.personRefereeCategoryViewModel.document.resource !== undefined) {
      this.selectedFileName = this.personRefereeCategoryViewModel.document.resource.name;
    }
    this.person = person;
    this.sportType = sportType;
  }

  loadPersons = async (from: number, searchText: string) => {
    return this._participantRestApiService.getPersons({name: searchText});
  };

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: Person) {
    return item.firstName + ' ' + item.lastName;
  }

  public async onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length) {
      this._file = fileList[0];
      this.selectedFileName = this._file.name;
    }
  }

  public async onSave() {
    try {
      if (this.personRefereeCategoryViewModel.data.assignDate) {
        this.personRefereeCategoryViewModel.data.assignDate = this._appHelper.getGmtDate(this.personRefereeCategoryViewModel.data.assignDate);
      }

      const personRefereeCategory = await this._participantRestApiService.updatePersonRefereeCategory(this.personRefereeCategoryViewModel.data, {}, {
        personId: this.person.id,
        sportTypeId: this.sportType.id
      });

      let document: Document = null;
      if (this.personRefereeCategoryViewModel.document.id) {
        document = await this._participantRestApiService.updateFile(this.personRefereeCategoryViewModel.document, this._file);
      } else {
        this.personRefereeCategoryViewModel.document.objectId = this.personRefereeCategoryViewModel.data.id;
        this.personRefereeCategoryViewModel.document.clazz = FileClass.PERSON_REFEREE_CATEGORY;
        document = await this._participantRestApiService.uploadFile(this.personRefereeCategoryViewModel.document, [this._file])[0];
      }

      // TODO: Update viewModel
      const personRefereeCategoryViewModel = new PersonRefereeCategoryViewModel(personRefereeCategory);
      await personRefereeCategoryViewModel.initialize();
      this.modal.dismiss(personRefereeCategoryViewModel);
    } catch (e) {
      await this._appHelper.showErrorMessage('saveError');
    }
  }

}
