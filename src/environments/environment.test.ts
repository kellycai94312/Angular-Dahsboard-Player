import { EnvironmentType } from './environment-type';
import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: true,
  version: '1.1.1-40',
  type: EnvironmentType.TEST,
  host: 'test.api.ar.zone',
  restUrl: 'https://test.api.ar.zone/sp/v2',
  wsUrl: 'https://test.api.ar.zone/sp/v2/ws'
};
