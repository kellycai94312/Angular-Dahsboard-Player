import { EnvironmentType } from './environment-type';
import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: true,
  version: '1.1.1-47',
  type: EnvironmentType.BELARUS,
  host: 'by.api.ar.zone',
  restUrl: 'https://by.api.ar.zone/sp/v2',
  wsUrl: 'https://by.api.ar.zone/sp/v2/ws'
};
