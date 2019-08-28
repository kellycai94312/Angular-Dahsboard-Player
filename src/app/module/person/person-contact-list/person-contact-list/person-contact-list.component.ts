import {Component, ComponentFactoryResolver, Input, OnInit} from '@angular/core';
import {Person} from '../../../../data/remote/model/person';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditPersonContactComponent} from '../../edit-person-contact/edit-person-contact/edit-person-contact.component';
import {PersonContact} from '../../../../data/remote/model/person/person-contact';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {UtilService} from '../../../../services/util/util.service';
import {DialogResult} from '../../../../data/local/dialog-result';

@Component({
  selector: 'app-person-contact-list',
  templateUrl: './person-contact-list.component.html',
  styleUrls: ['./person-contact-list.component.scss']
})
export class PersonContactListComponent implements OnInit {

  @Input()
  public person: Person;

  @Input()
  public canEdit: boolean;

  public contacts: PersonContact[];

  constructor(private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _utilService: UtilService,
              private _personApiService: PersonApiService) {
  }

  public ngOnInit(): void {
    this._personApiService.getPersonContacts(this.person).subscribe(value => {
      this.contacts = value;
    });
  }

  public async onAdd(): Promise<void> {
    const dialogResult = await this._openEditPersonContact(new PersonContact());
    if (dialogResult.result) {
      this.contacts.push(dialogResult.data);
    }
  }

  public async onEdit(item: PersonContact): Promise<void> {
    const dialogResult = await this._openEditPersonContact(item);
    if (dialogResult.result) {
      const itemIndex = this.contacts.findIndex(value => value.id == item.id);
      if (itemIndex > -1) {
        this.contacts[itemIndex] = dialogResult.data;
      }
    }
  }

  private async _openEditPersonContact(contact: PersonContact): Promise<DialogResult<PersonContact>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'contacts';
    let editPersonContactComponent: EditPersonContactComponent;
    await modal.componentInstance.initializeBody(EditPersonContactComponent, async component => {
      editPersonContactComponent = component;
      component.person = this.person;
      await component.initialize(this._utilService.clone(contact));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});
    return {result: await this._ngxModalService.awaitModalResult(modal), data: editPersonContactComponent.data};
  }

}
