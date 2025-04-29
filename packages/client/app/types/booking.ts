import type { UUID } from "crypto";
import type { Flight } from "./flight";

export type Booking = {
  id: UUID;
  code: string;
  firstName: string;
  lastName: string;
  flight: Flight;
};
