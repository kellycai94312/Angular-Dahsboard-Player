import { EnvironmentType } from './environment-type';
import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  version: '1.1.1-66',
  type: EnvironmentType.LOCAL,
  host: 'localhost:8082',
  restUrl: 'https://by.api.ar.zone/sp/v2',
  wsUrl: 'https://by.api.ar.zone/ws'
};
