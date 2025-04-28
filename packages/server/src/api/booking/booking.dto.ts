import { UUID } from "crypto";
import { Booking } from "src/feature/booking/booking.entity";
import { FlightDto } from "../flight/flight.dto";

export class BookingDto {
  constructor(booking: Booking) {
    this.id = booking.id;
    this.code = booking.code;
    this.firstName = booking.firstName;
    this.lastName = booking.lastName;
    this.flight = booking.flight;
  }

  id: UUID;

  code: string;

  firstName: string;

  lastName: string;

  flight: FlightDto;
}
