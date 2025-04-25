import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import DATA_SOURCE from "./config/typeorm-data-source.config";
import { BookingModule } from "./feature/booking/booking.module";
import { FlightModule } from "./feature/flight/flight.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DATA_SOURCE.options }),
    BookingModule,
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
