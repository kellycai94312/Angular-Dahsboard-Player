import {ShortNameObject} from '../../base/short-name-object';
import {Application} from './application';
import {DeviceVersion} from '../device/device-version';

export class ApplicationVersion extends ShortNameObject {
  public manufacturerResource: string;
  public application: Application;
  public deviceVersion: DeviceVersion;
}
