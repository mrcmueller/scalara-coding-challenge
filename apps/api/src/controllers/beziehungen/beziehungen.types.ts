import { Prisma } from '@/generated/prisma';

type BeziehungPayloads = Prisma.BeziehungGetPayload<{
  include: { kontakt: true; immobilie: true };
}>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const beziehungmitPayloads = Prisma.validator<Prisma.BeziehungDefaultArgs>()({
  include: { kontakt: true, immobilie: true },
});

type BeziehungMitPayloadsQuery = Prisma.BeziehungGetPayload<
  typeof beziehungmitPayloads
>;

export type { BeziehungPayloads, BeziehungMitPayloadsQuery };
