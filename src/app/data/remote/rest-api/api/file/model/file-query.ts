import { FileType } from '../../../../model/file/base';
import { ImageType } from '../../../../model/file/image';
import { PageQuery } from '../../../page-query';

export class FileQuery extends PageQuery {
  public tagIds?: string;
  public fileTypeEnum?: FileType;
  public imageType?: ImageType;
  public parentFolderId?: number;
  public fileTemplateId?: number;
}
