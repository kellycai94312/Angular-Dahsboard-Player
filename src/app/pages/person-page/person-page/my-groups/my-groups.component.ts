import {OnInit} from '@angular/core';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {PersonService} from '../../../person/person-page/service/person.service';

// @Component({
//   selector: 'app-my-groups',
//   templateUrl: './my-groups.component.html',
//   styleUrls: ['./my-groups.component.scss']
// })
export class MyGroupsComponent implements OnInit {

  public groupPersons: GroupPerson[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _personService: PersonService) {
  }

  async ngOnInit() {
    // try {
    //   this.groupPersons = await this._participantRestApiService.getGroupPersons({personId: this._personService.personViewModel.data.id});
    // } catch (e) {
    // }
  }

  public onEdit = async () => {
    // const person = await this._authorizationService.getPerson();
    // const groups = (await this._participantRestApiService.getGroupPersons({personId: person.id})).map(x => x.group);
    //
    // const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    // const componentInstance = ref.componentInstance as ModalSelectPageComponent<any>;
    // componentInstance.headerNameKey = 'edit';
    // componentInstance.component = NamedObjectItemComponent;
    // componentInstance.getItems = async pageQuery => {
    //   const items = groups.filter(x => x.name.toString().toLowerCase().indexOf(pageQuery.name) > -1);
    //   const pageContainer = new PageContainer();
    //   pageContainer.from = 0;
    //   pageContainer.size = items.length;
    //   pageContainer.total = items.length;
    //   pageContainer.list = items;
    //   return pageContainer;
    // };
    // componentInstance.onSave = async selectedItems => {
    //   this.groupPersons = await this._participantRestApiService.updateGroupPersons(new ListRequest(selectedItems), {}, {personId: this._personService.personViewModel.data.id});
    //   ref.dismiss();
    // };
    //
    // const selectedGroups = (await this._participantRestApiService.getGroupPersons({personId: this._personService.personViewModel.data.id})).map(x => x.group);
    // await componentInstance.initialize(selectedGroups);
  };

}
