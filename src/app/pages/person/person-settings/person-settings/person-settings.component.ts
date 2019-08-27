import {Component, OnInit} from '@angular/core';
import {PersonItemType} from '../../../../module/person/menu-person-detail/model/person-item-type';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {BasePersonSettingsComponent} from '../model/base-person-settings-component';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Person} from '../../../../data/remote/model/person';

@Component({
  selector: 'app-person-settings',
  templateUrl: './person-settings.component.html',
  styleUrls: ['./person-settings.component.scss']
})
export class PersonSettingsComponent implements OnInit {

  public component: BaseEditComponent<Person>;
  public selectedComponent: BasePersonSettingsComponent;
  public items: NameWrapper<string>[];

  public ngOnInit(): void {
    this.items = Object.keys(PersonItemType).map(value => new NameWrapper(this._getPathByPersonItemType(value as PersonItemType), `personItemTypeEnum.${value}`));
  }

  public onRouterOutletActivate(value: any): void {
    this.selectedComponent = value;
  }

  public onRouterOutletDeactivate(value: any): void {
    delete this.selectedComponent;
  }

  public async onRemove(): Promise<void> {
    await this.selectedComponent.onRemove();
  }

  public async onSave(): Promise<void> {
    await this.selectedComponent.onSave();
  }

  private _getPathByPersonItemType(value: PersonItemType) {
    switch (value) {
      case PersonItemType.CONTACTS:
        return 'contact';
      default:
        return value.toLocaleLowerCase();
    }
  }

}
