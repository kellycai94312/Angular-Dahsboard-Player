import {IEnvironment} from './ienvironment';
import {EnvironmentType} from './environment-type';

export const environment: IEnvironment = {
  production: true,
  type: EnvironmentType.TEST,
  host: 'test.api.ar.zone',
  restUrl: 'https://test.api.ar.zone/sp/v2',
  wsUrl: 'https://test.api.ar.zone/sp/v2/ws',
};