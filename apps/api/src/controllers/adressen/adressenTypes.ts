import { Land } from '@/generated/prisma';

type LandString = 'Deutschland' | 'Italien' | 'Frankreich';

type Adresse = {
  strasse: string;
  hausnummer: string;
  postleitzahl: string;
  stadt: string;
  land: Land;
};

export type { Adresse, LandString };
