import {Component, OnInit} from '@angular/core';
import {PersonMenuItemType} from '../../../../../module/person/menu-person-detail/model/person-menu-item-type';
import {MenuItem} from '../../../../../module/common/item-line/model/menu-item';
import {PersonService} from '../../service/person.service';
import {BasePersonComponent} from '../../../model/base-person-component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent extends BasePersonComponent implements OnInit {

  public readonly personMenuItemTypeClass = PersonMenuItemType;
  public items: MenuItem[];

  constructor(personService: PersonService) {
    super(personService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.items = Object.keys(PersonMenuItemType).map(x => {
      return {
        translationLabel: `personMenuItemTypeEnum.${x}`,
        data: x
      };
    });
  }

}
