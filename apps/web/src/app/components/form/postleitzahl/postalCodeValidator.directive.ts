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

export function postalCodeValidator(postalCode: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalidPostalCode = Locales.some((locale) =>
      validator.isPostalCode(postalCode, locale as validator.PostalCodeLocale),
    );
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

// const sumWithInitial = array1.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   initialValue,
// );

@Directive({
  selector: '[invalidPostalCode]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InvalidPostalCodeDirective,
      multi: true,
    },
  ],
})
export class InvalidPostalCodeDirective implements Validator {
  postalCode = input<string>('', { alias: 'invalidPostalCode' });
  validate(control: AbstractControl): ValidationErrors | null {
    return this.postalCode
      ? postalCodeValidator(new RegExp(this.forbiddenName(), 'i'))(control)
      : null;
  }
}
