import type { UUID } from "crypto";

export type CreateBookingDto = {
  flightId: UUID;
  firstName: string;
  lastName: string;
};
