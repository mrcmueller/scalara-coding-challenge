import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import validator from 'validator';
import { LocalesType, Locales } from '../land/land-editor.component';

export function postalCodeValidator(locale: LocalesType): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalidPostalCode = !validator.isPostalCode(control.value, locale);
    return invalidPostalCode
      ? { invalidPostalCode: { value: control.value } }
      : null;
  };
}

// const sumWithInitial = array1.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   initialValue,
// );

// @Directive({
//   selector: '[invalidPostalCode]',
//   providers: [
//     {
//       provide: NG_VALIDATORS,
//       useExisting: InvalidPostalCodeDirective,
//       multi: true,
//     },
//   ],
// })
// export class InvalidPostalCodeDirective implements Validator {
//   postalCode = input<string>('', { alias: 'invalidPostalCode' });
//   locale = input<LocalesType>('DE', { alias: 'invalidLocale' });
//   validate(control: AbstractControl): ValidationErrors | null {
//     return this.postalCode
//       ? postalCodeValidator(this.postalCode(), this.locale())(control)
//       : null;
//   }
// }
