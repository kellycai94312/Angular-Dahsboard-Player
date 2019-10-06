import { File } from '../file';
import { Folder } from '../folder';
import { Image } from '../image';
import { FileType } from './file-type';

export const FILE_SUBTYPES = [
  {value: File, name: FileType.FILE},
  {value: Image, name: FileType.IMAGE},
  {value: Folder, name: FileType.FOLDER}
];
