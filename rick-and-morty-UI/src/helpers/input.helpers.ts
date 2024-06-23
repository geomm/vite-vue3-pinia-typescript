import { maxValue, minValue, required } from '@vuelidate/validators';
import { dangerousCharsMap, projectAvailableValidations } from '@/constants/input.constants';
import type { InputValue } from '@/models/input-types.model';
import type { IValidation } from '@/models/validation.model';

export function sanitizeInput(input: InputValue) {
  if (typeof input === 'string') {
    return input!.toString().replace(/[&<>"'/\\;\-*%_]/g, (m) => dangerousCharsMap[m]);
  }
  return input;
}

export function parseValidations(
  validations: Exclude<string | undefined, undefined>
): IValidation[] {
  const validationArray = validations?.split(',');

  return validationArray?.map((validationType: string) => {
    const validationRuleArray = validationType.split(':');

    const validationRule = validationRuleArray.length
      ? validationRuleArray[0].trim()
      : validationType;

    switch (validationRule) {
      case projectAvailableValidations.REQUIRED:
        return { required };
      case projectAvailableValidations.MAXNUMBER:
        return {
          maxValue: maxValue(Number(validationRuleArray[validationRuleArray.length - 1]))
        };
      case projectAvailableValidations.MINNUMBER:
        return {
          minValue: minValue(Number(validationRuleArray[validationRuleArray.length - 1]))
        };
      default:
        return {};
    }
  }) as IValidation[];
}
