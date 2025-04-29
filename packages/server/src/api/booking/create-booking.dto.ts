import { UUID } from "crypto";

export class CreateBookingDto {
  flightId: UUID;

  firstName: string;

  lastName: string;
}
