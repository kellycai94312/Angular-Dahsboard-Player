import {EnvironmentType} from './environment-type';

export interface IEnvironment {
  production: boolean;
  version: string;
  type: EnvironmentType;
  host: string;
  restUrl: string;
  wsUrl: string;
}
