import { Module } from "@nestjs/common";
import { BookingControllerModule } from "./booking/booking.controller.module";
import { FlightControllerModule } from "./flight/flight.controller.module";
import { LocationControllerModule } from "./location/location.controller.module";

@Module({
  imports: [
    BookingControllerModule,
    FlightControllerModule,
    LocationControllerModule,
  ],
  exports: [],
  providers: [],
})
export class ApiModule {}
