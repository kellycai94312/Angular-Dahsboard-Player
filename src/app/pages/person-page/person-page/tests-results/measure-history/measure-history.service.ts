import { Injectable } from '@angular/core';
import { ExerciseExecMeasureValue } from '../../../../../data/remote/model/training/exercise-exec-measure-value';

@Injectable()
export class MeasureHistoryService {
  private _measureValues: ExerciseExecMeasureValue[];
  private _exerciseMeasureId: number;

  get measureValues(): ExerciseExecMeasureValue[] {
    return this._measureValues;
  }

  set measureValues(value: ExerciseExecMeasureValue[]) {
    this._measureValues = value;
  }

  get exerciseMeasureId(): number {
    return this._exerciseMeasureId;
  }

  set exerciseMeasureId(value: number) {
    this._exerciseMeasureId = value;
  }

}
