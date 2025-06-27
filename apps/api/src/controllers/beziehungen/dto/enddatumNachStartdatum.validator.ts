import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const hatStartdatumProperty = (input: any): input is { startdatum: any } => {
  return typeof input === 'object' && input != null && 'startdatum' in input;
};

const zuValidemDateOderFalse = (input: any) => {
  const toDate = new Date(input);
  if (toDate.toString() !== 'Invalid Date') return toDate;
  return false;
};

let errorMessage = 'Das Enddatum darf nicht vor dem Startdatum liegen';

@ValidatorConstraint({ name: 'enddatumNachStartdatum', async: false })
export class EnddatumNachStartdatumValidator
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    // dieser Validator ist auf dem Enddatum anzuwenden

    // value und args.value ist der Wert von der Input Prop die validiert wird
    // args.object ist das Objekt, dass vom Client geschickt wurde

    const { object } = args;

    // 1. Inputs überprüfen

    // 1.1 Überprüfen ob alle Properties überhaupt existieren

    if (!hatStartdatumProperty(object)) {
      errorMessage = 'Das startdatum fehlt in der dto';
      return false;
    }

    // 1.2 Wenn ja, checken ob die types auch stimmen (beinhaltet auch runtime checks)

    // typecheck beinhaltet Konvertierung, so spare ich mir zweimal zu konvertieren (bei check für pot. Fehlermeldung und für Konvertierung nach bestandenem Typecheck)
    const startdatum = zuValidemDateOderFalse(object.startdatum);

    if (!startdatum) {
      errorMessage = 'Das Startdatum ist ungültig oder fehlt';
      return false;
    }

    const enddatum = zuValidemDateOderFalse(value);

    if (!enddatum) {
      errorMessage = 'Das Enddatum ist ungültig oder fehlt';
      return false;
    }

    // 3. Eigentliche Validierung

    const enddatumVorStartdatum = enddatum.getTime() < startdatum.getTime();

    if (enddatumVorStartdatum) {
      errorMessage = 'Das Enddatum darf nicht vor dem Startdatum liegen';
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return errorMessage;
  }
}
