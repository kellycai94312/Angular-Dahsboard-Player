import { GameValue } from "./game-value";
import { GamePerson } from "./game-person";
import { GamePart } from "./game-part";
import { GameInfo } from "./game-info";

export class GameReport {
  gameInfo: GameInfo;
  parts: GamePart[];
  persons: GamePerson[];
  values: GameValue[];
}
