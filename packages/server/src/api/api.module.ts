import { Module } from "@nestjs/common";
import { BookingControllerModule } from "./booking/booking.controller.module";
import { FlightControllerModule } from "./flight/flight.controller.module";

@Module({
  imports: [BookingControllerModule, FlightControllerModule],
  exports: [],
  providers: [],
})
export class ApiModule {}
