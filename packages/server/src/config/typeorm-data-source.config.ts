import { Booking } from "../feature/booking/booking.entity";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import TypeOrmLogger from "./typeorm-logger";
import { Flight } from "../feature/flight/flight.entity";
import { Location } from "../feature/location/location.entity";
import { Craft } from "../feature/craft/craft.entity";

const DATA_SOURCE = new DataSource({
  type: "sqlite",
  database: "moon_flight_db",
  entities: [Booking, Flight, Location, Craft],
  synchronize: false,
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
  logger: new TypeOrmLogger(),
});

export default DATA_SOURCE;
