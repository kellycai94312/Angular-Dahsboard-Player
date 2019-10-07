import { BaseFile } from './base-file';

export class ResourceFile extends BaseFile {
  public extension: string;
  public length: number;
  public mimeType: string;
}
