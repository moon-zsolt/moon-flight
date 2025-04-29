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
    this.checkedIn = booking.checkedIn === 1;
    this.seat = booking.seat;
  }

  id: UUID;

  code: string;

  firstName: string;

  lastName: string;

  flight: FlightDto;

  checkedIn: boolean;

  seat: number | null;
}
