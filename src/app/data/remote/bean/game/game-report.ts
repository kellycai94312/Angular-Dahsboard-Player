import { GameValue } from "./game-value";
import { GamePersonValue } from "./game-person-value";
import { GamePart } from "./game-part";
import { GameInfo } from "./game-info";
import { GamePerson } from "./game-person";
import { GameGroup } from "./game-group";

export class GameReport {
  gameInfo: GameInfo;
  parts: GamePart[];
  personValues: GamePersonValue[];
  values: GameValue[];
  group1: GameGroup;
  group2: GameGroup;
  persons1: GamePerson[];
  persons2: GamePerson[];
}
