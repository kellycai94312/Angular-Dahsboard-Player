import {StompConfig} from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {PropertyConstant} from '../local/property-constant';

export const stompConfig: StompConfig = {
  url: new SockJS(PropertyConstant.wsUrl),
  headers: {},
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: !environment.production
};
