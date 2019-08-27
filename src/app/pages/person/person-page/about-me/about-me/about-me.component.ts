import {Component, OnInit} from '@angular/core';
import {PersonItemType} from '../../../../../module/person/menu-person-detail/model/person-item-type';
import {MenuItem} from '../../../../../module/common/item-line/model/menu-item';
import {PersonService} from '../../service/person.service';
import {BasePersonComponent} from '../../../model/base-person-component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent extends BasePersonComponent implements OnInit {

  public readonly personItemTypeClass = PersonItemType;
  public items: MenuItem[];

  constructor(personService: PersonService) {
    super(personService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.items = Object.keys(PersonItemType).map(x => {
      return {
        translationLabel: `personItemTypeEnum.${x}`,
        data: x
      };
    });
  }

}
