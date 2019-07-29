import {BaseAddress} from './base-address';

export class AccurateAddress extends BaseAddress {
  public postIndex?: string;
  public street?: string;
  public house?: string;
  public block?: string;
  public liter?: string;
}
