import type { UUID } from "crypto";

import type { Location } from "./location";

export type Flight = {
  id: UUID;
  code: string;
  craft: {
    id: UUID;
    name: string;
    capacity: number;
  };
  start: Location;
  destination: Location;
  date: string;
  flightTimeInMinutes: number;
  distanceInKm: number;
  emptySeats: number;
};
