import { z } from 'zod/v4';

export const cardStatusEnum = z.enum([
  'pending',
  'inactive',
  'active',
  'blocked',
  'suspended',
  'expired',
  'lost',
  'stolen',
  'replaced',
  'cancelled',
]);

export type CardStatusType = z.infer<typeof cardStatusEnum>;
