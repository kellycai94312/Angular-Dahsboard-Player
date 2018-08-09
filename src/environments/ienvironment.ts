import {EnvironmentType} from './environment-type';

export interface IEnvironment {
  production: boolean;
  type: EnvironmentType;
  host: string;
  restUrl: string;
  wsUrl: string;
}
