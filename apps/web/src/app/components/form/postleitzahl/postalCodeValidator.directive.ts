import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import validator from 'validator';
import { Locale } from '../land/laender';

export function postalCodeValidator(getLocale: () => string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalidPostalCode = !validator.isPostalCode(
      control.value,
      getLocale() as 'any',
    );
    return invalidPostalCode
      ? { invalidPostalCode: { value: control.value } }
      : null;
  };
}
