import {IEnvironment} from './ienvironment';
import {EnvironmentType} from './environment-type';

export const environment: IEnvironment = {
  production: true,
  version: '0.3.1-31',
  type: EnvironmentType.DEMO,
  host: 'demo.api.ar.zone',
  restUrl: 'https://demo.api.ar.zone/sp/v2',
  wsUrl: 'https://demo.api.ar.zone/sp/v2/ws',
};
