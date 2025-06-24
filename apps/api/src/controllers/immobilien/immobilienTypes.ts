import { AdresseErstellenDto } from '../adressen/dto/adresseErstellen.dto';

type AdresseImmobilienInput = string | AdresseErstellenDto;

type Immobilie = {
  name: string;
  beschreibung: string;
  adresse: AdresseImmobilienInput;
};

export type { Immobilie, AdresseImmobilienInput };
