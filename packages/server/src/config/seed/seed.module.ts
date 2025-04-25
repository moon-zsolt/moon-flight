import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { BookingModule } from "../../feature/booking/booking.module";
import { FlightModule } from "../../feature/flight/flight.module";
import { LocationModule } from "../../feature/location/location.module";
import { CraftModule } from "../../feature/craft/craft.module";

@Module({
  imports: [BookingModule, FlightModule, LocationModule, CraftModule],
  exports: [],
  providers: [SeedService],
})
export class SeedModule {}
