import { EnvironmentType } from './environment-type';
import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: true,
  version: '1.1.1-51',
  type: EnvironmentType.DEMO,
  host: 'demo.api.ar.zone',
  restUrl: 'https://demo.api.ar.zone/sp/v2',
  wsUrl: 'https://demo.api.ar.zone/sp/v2/ws'
};
