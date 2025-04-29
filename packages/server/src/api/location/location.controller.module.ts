import { Module } from "@nestjs/common";
import { LocationModule } from "src/feature/location/location.module";
import { LocationController } from "./location.controller";

@Module({
  imports: [LocationModule],
  exports: [],
  providers: [],
  controllers: [LocationController],
})
export class LocationControllerModule {}
