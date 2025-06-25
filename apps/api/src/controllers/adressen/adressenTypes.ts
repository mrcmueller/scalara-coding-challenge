import { Land } from '@/generated/prisma';

type LandString = 'Deutschland' | 'Italien' | 'Frankreich';

const landCheck = (input: any) => {
  return (
    input === 'Deutschland' || input === 'Italien' || input === 'Frankreich'
  );
};

type Adresse = {
  strasse: string;
  hausnummer: string;
  postleitzahl: string;
  stadt: string;
  land: Land;
};

export type { Adresse, LandString };
export { landCheck };
