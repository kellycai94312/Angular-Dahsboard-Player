import {IEnvironment} from './ienvironment';
import {EnvironmentType} from './environment-type';

export const environment: IEnvironment = {
  production: true,
  version: '0.2.13',
  type: EnvironmentType.PRODUCTION,
  host: 'api.ar.zone',
  restUrl: 'https://api.ar.zone/sp/v2',
  wsUrl: 'https://api.ar.zone/sp/v2/ws',
};
