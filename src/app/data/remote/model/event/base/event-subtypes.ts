import { JsonSubType } from 'class-transformer';
import { Competition } from '../competition';
import { Diet } from '../diet';
import { Education } from '../education';
import { Event } from '../event';
import { Game } from '../game';
import { Meeting } from '../meeting';
import { Relaxation } from '../relaxation';
import { Testing } from '../testing';
import { Training } from '../training';
import { EventType } from './event-type';

export const EVENT_SUBTYPES: JsonSubType[] = [
  {value: Event, name: EventType.EVENT},
  {value: Training, name: EventType.TRAINING},
  {value: Testing, name: EventType.TESTING},
  {value: Game, name: EventType.GAME},
  {value: Competition, name: EventType.COMPETITION},
  {value: Relaxation, name: EventType.RELAXATION},
  {value: Diet, name: EventType.DIET},
  {value: Meeting, name: EventType.MEETING},
  {value: Education, name: EventType.EDUCATION}
];
