import { Prisma } from '@/generated/prisma';

type ImmobiliePayloadMitBeziehungen = Prisma.ImmobilieGetPayload<{
  include: { beziehungen: true };
}>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const immobilieMitBeziehungen = Prisma.validator<Prisma.ImmobilieDefaultArgs>()(
  {
    include: { beziehungen: true },
  },
);

type ImmobilieMitBeziehungenQuery = Prisma.ImmobilieGetPayload<
  typeof immobilieMitBeziehungen
>;

export type { ImmobiliePayloadMitBeziehungen, ImmobilieMitBeziehungenQuery };
