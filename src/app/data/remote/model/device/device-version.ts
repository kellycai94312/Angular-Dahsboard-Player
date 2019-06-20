import {Device} from './device';
import {ShortNameObject} from '../../base/short-name-object';

export class DeviceVersion extends ShortNameObject {
  public device: Device;
  public videoResource: string;
  public manufacturerResource: string;
}
