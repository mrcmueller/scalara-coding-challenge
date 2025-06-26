import { Prisma } from '@/generated/prisma';

type KontaktPayloadMitBeziehungen = Prisma.KontaktGetPayload<{
  include: { beziehungen: true };
}>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const kontaktMitBeziehungen = Prisma.validator<Prisma.KontaktDefaultArgs>()({
  include: { beziehungen: true },
});

type KontaktMitBeziehungenQuery = Prisma.KontaktGetPayload<
  typeof kontaktMitBeziehungen
>;

export type { KontaktPayloadMitBeziehungen, KontaktMitBeziehungenQuery };
