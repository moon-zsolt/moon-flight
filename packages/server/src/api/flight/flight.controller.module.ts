import { Module } from "@nestjs/common";
import { FlightController } from "./flight.controller";
import { FlightModule } from "src/feature/flight/flight.module";

@Module({
  imports: [FlightModule],
  exports: [],
  providers: [],
  controllers: [FlightController],
})
export class FlightControllerModule {}
