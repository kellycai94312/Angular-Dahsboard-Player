import { EnvironmentType } from './environment-type';

// tslint:disable-next-line:interface-name
export interface IEnvironment {
  production: boolean;
  version: string;
  type: EnvironmentType;
  host: string;
  restUrl: string;
  wsUrl: string;
}
