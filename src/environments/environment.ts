import {EnvironmentType} from './environment-type';
import {IEnvironment} from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  version: '0.3.1-7',
  type: EnvironmentType.LOCAL,
  host: 'localhost:8082',
  restUrl: 'http://localhost:8082',
  wsUrl: 'http://localhost:8082/ws',
};
