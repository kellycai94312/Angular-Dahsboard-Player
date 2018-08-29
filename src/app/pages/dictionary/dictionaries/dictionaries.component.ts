import {Component} from '@angular/core';
import {NameWrapper} from '../../../data/local/name-wrapper';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent {

  public dictionaries: NameWrapper<string>[];

  constructor() {
    this.dictionaries = [
      {name: 'controlTransferStandards', data: 'stage-standard'},
      {name: 'sportsTrainingStage', data: 'stage'},
      {name: 'stageType', data: 'stage-type'}
    ];
  }

}
