import {IEnvironment} from './ienvironment';
import {EnvironmentType} from './environment-type';

export const environment: IEnvironment = {
  production: true,
  version: '0.2.10',
  type: EnvironmentType.BELARUS,
  host: 'by.api.ar.zone',
  restUrl: 'https://by.api.ar.zone/sp/v2',
  wsUrl: 'https://by.api.ar.zone/sp/v2/ws',
};
