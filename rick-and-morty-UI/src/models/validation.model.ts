import type { ValidationRuleWithParams } from '@vuelidate/core';

export interface IValidation {
  [key: string]: ValidationRuleWithParams<any, any>;
}

// sanitization
export interface IDangarousCharsMap {
  [key: string]: string;
}

