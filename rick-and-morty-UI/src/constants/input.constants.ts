import type { IDangarousCharsMap } from '@/models/validation.model';

export const dangerousCharsMap: IDangarousCharsMap = {
  '&': '',
  '<': '',
  '>': '',
  '"': '',
  "'": '',
  '/': '',
  '\\': '',
  ';': '',
  '--': '',
  '/*': '',
  '*\\': '',
  '%': '',
  _: ''
};

export enum projectAvailableValidations {
  REQUIRED = 'required',
  MAXNUMBER = 'maxNumericValue',
  MINNUMBER = 'minNumericValue'
}
