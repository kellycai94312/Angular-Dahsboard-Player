import { Component, Input, OnInit } from '@angular/core';
import { ExerciseMeasure } from '../../../../../data/remote/model/exercise/exercise-measure';

@Component({
  selector: 'app-exercise-measure-item',
  templateUrl: './exercise-measure-item.component.html',
  styleUrls: ['./exercise-measure-item.component.scss']
})
export class ExerciseMeasureItemComponent implements OnInit {

  @Input()
  public data: ExerciseMeasure;

  constructor() {
  }

  ngOnInit() {
  }

}
