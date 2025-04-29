import { Module } from "@nestjs/common";
import { BookingRepository } from "./booking.repository";
import { BookingService } from "./booking.service";
import { FlightModule } from "../flight/flight.module";

@Module({
  imports: [FlightModule],
  exports: [BookingRepository, BookingService],
  providers: [BookingRepository, BookingService],
})
export class BookingModule {}
