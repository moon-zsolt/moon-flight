import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import DATA_SOURCE from "./config/typeorm-data-source.config";
import { BookingModule } from "./feature/booking/booking.module";
import { FlightModule } from "./feature/flight/flight.module";
import { CraftModule } from "./feature/craft/craft.module";
import { LocationModule } from "./feature/location/location.module";
import { SeedModule } from "./config/seed/seed.module";
import { ApiModule } from "./api/api.module";
import { FrontendModule } from "./shared/frontend/frontend.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DATA_SOURCE.options }),
    BookingModule,
    FlightModule,
    LocationModule,
    CraftModule,
    SeedModule,
    ApiModule,
    FrontendModule.register(),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
