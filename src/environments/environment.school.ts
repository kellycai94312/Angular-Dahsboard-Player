import {IEnvironment} from './ienvironment';
import {EnvironmentType} from './environment-type';

export const environment: IEnvironment = {
  production: true,
  version: '0.2.12',
  type: EnvironmentType.SCHOOL,
  host: 'sch.api.ar.zone',
  restUrl: 'https://sch.api.ar.zone/sp/v2',
  wsUrl: 'https://sch.api.ar.zone/sp/v2/ws',
};
