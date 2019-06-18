import {Component} from '@angular/core';
import {NameWrapper} from '../../../data/local/name-wrapper';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent {

  public readonly dictionaries: NameWrapper<string>[];

  constructor() {
    this.dictionaries = [
      // {name: 'controlTransferStandards', data: 'stage-standard'},
      // {name: 'sportsTrainingStage', data: 'stage'},
      // {name: 'stageType', data: 'stage-type'},
      {name: 'sportType', data: 'sport-type'},
      // {name: 'organizations', data: 'organization'},
      // {name: 'exercises', data: 'exercise'},
      // {name: 'tests', data: 'test'},
      {name: 'parameters', data: 'parameter'},
      {name: 'units', data: 'unit'}
    ];
  }

}
