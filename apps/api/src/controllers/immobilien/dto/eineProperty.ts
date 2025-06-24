/* eslint  @typescript-eslint/no-unsafe-call: 0 */

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { AdresseErstellenDto } from '../../adressen/dto/adresseErstellen.dto';

@ValidatorConstraint({ name: 'eineProperty', async: false })
export class EineProperty implements ValidatorConstraintInterface {
  validate(input: string | AdresseErstellenDto, args: ValidationArguments) {
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Du benötigst entweder die Property adresse oder adressenId, aber beide zusammen sind nicht erlaubt';
  }
}
