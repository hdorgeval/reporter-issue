import { isDirectory } from './is-directory';
import { isFile } from './is-file';
import { existsSync } from 'fs';

export const fileExists = (filePath: string): boolean => {
  if (existsSync(filePath) && isFile(filePath)) {
    return true;
  }

  if (existsSync(filePath) && isDirectory(filePath)) {
    throw new Error(`File '${filePath}' is a directory but should be a file.`);
  }

  return false;
};
