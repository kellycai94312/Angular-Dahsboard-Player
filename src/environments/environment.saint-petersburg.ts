import {IEnvironment} from './ienvironment';
import {EnvironmentType} from './environment-type';

export const environment: IEnvironment = {
  production: true,
  type: EnvironmentType.SAINT_PETERSBURG,
  host: 'spb.api.ar.zone',
  restUrl: 'https://spb.api.ar.zone/sp/v2',
  wsUrl: 'https://spb.api.ar.zone/sp/v2/ws',
};
